import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../models/auth-credentials.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.model';
import { FirebaseService } from 'src/firebase/firebase.service';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { COLLECTIONS, FAILED_MESSAGES, SUCCESS_MESSAGES } from 'src/constant';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}
  private USERNAME_FIELD = 'username';

  async signUp({ username, password }: AuthCredentialsDto): Promise<string> {
    const dbRef = collection(this.firebaseService.db, COLLECTIONS.ADMIN);
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.ADMIN),
      where(this.USERNAME_FIELD, '==', username),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0)
      throw new BadRequestException(FAILED_MESSAGES.USERNAME_EXISTS);

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      addDoc(dbRef, { username, password: hashedPassword });
      return SUCCESS_MESSAGES.SUCCESS;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn({
    username,
    password,
  }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.ADMIN),
      where(this.USERNAME_FIELD, '==', username),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot?.docs[0]?.exists()) {
      const user = querySnapshot.docs[0].data();
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      }
    } else {
      throw new BadRequestException(FAILED_MESSAGES.FAILED_LOGIN);
    }
  }

  async userSignUp({ username, password }: AuthCredentialsDto): Promise<string> {
    const dbRef = collection(this.firebaseService.db, COLLECTIONS.USERS);
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.USERS),
      where(this.USERNAME_FIELD, '==', username),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0)
      throw new BadRequestException(FAILED_MESSAGES.USERNAME_EXISTS);

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      addDoc(dbRef, { username, password: hashedPassword });
      return SUCCESS_MESSAGES.SUCCESS;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async userSignIn({
    username,
    password,
  }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.USERS),
      where(this.USERNAME_FIELD, '==', username),
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot?.docs[0]?.exists()) {
      const user = querySnapshot.docs[0].data();
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      }
    } else {
      throw new UnauthorizedException(FAILED_MESSAGES.FAILED_LOGIN);
    }
  }
}
