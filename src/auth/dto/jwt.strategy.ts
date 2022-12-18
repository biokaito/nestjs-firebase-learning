import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../models/jwt-payload.model';
import { ConfigService } from '@nestjs/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { COLLECTIONS } from 'src/constant';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectRepository(UsersRepository)
    // private usersRepository: UsersRepository,
    private configService: ConfigService,
    private firebaseService: FirebaseService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ username }: JwtPayload): Promise<any> {
    const q = query(
      collection(this.firebaseService.db, COLLECTIONS.ADMIN),
      where('username', '==', username),
    );
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs[0].data();
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
