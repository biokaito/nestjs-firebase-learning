import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [AuthModule, ConfigModule, FirebaseModule],
  providers: [ProductService, FirebaseService],
  controllers: [ProductController]
})
export class ProductModule {}
