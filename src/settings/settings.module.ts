import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [AuthModule, ConfigModule, FirebaseModule],
  providers: [SettingsService, FirebaseService],
  controllers: [SettingsController],
})
export class SettingsModule {}
