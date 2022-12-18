import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [AuthModule,ConfigModule, FirebaseModule],
  providers: [OrderService, FirebaseService],
  controllers: [OrderController]
})
export class OrderModule {}
