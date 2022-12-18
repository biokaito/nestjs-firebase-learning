import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { SettingsModule } from './settings/settings.module';
import { UploadimageModule } from './uploadimage/uploadimage.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  // forRoot() is a method that allows the module
  // to expose module internal things
  // Is a static method and can be named anything,
  // But by convension is called forRoot or register.
  // Inthe case of ConfigModule,
  // this method loads the .env file
  // and the vairables.
  // So it's better to import configmodule in the AppModule
  imports: [ConfigModule.forRoot(), AuthModule, FirebaseModule, SettingsModule, UploadimageModule, CategoriesModule, OrderModule, ProductModule],
})
export class AppModule {}
