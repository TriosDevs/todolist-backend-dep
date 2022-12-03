import { Module } from '@nestjs/common';
import { HomeController } from '../controller/home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { AuthController } from 'src/controller/auth.controller';

// import dotenv
import * as dotenv from 'dotenv';
import { UserController } from 'src/controller/user.controller';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',  
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule
  ],
  controllers: [HomeController, AuthController, UserController],
  providers: [],

})
export class AppModule { }
