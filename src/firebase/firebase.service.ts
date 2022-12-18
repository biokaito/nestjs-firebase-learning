import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import { FirebaseConfig } from 'src/models/firebase-config.model';

@Injectable()
export class FirebaseService {
  private app: FirebaseApp;
  public storage;
  public db;
  constructor(private configService: ConfigService<FirebaseConfig>) {
    this.app = initializeApp({
      apiKey: this.configService.get<string>('apiKey'),
      appId: this.configService.get<string>('appId'),
      authDomain: this.configService.get<string>('authDomain'),
      measurementId: this.configService.get<string>('measurementId'),
      messagingSenderId: this.configService.get<string>('messagingSenderId'),
      projectId: this.configService.get<string>('projectId'),
      storageBucket: this.configService.get<string>('storageBucket'),
    });
    this.db = getFirestore(this.app);
    this.storage = getStorage();
  }
}
