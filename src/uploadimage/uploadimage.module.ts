import { Module } from '@nestjs/common';
import { UploadimageService } from './uploadimage.service';
import { UploadimageController } from './uploadimage.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [AuthModule, FirebaseModule, ConfigModule],
  providers: [UploadimageService, FirebaseService, ConfigService],
  controllers: [UploadimageController]
})
export class UploadimageModule {}
