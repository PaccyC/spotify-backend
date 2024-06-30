import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from './modules/songs/songs.module';
import { LoggerMiddleware } from 'logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),

   AuthModule, 
  UserModule, 
 TypeOrmModule.forRoot({
  type:'mysql',
  host:'127.0.0.1',
  port:3306,
  username:'test',
  password:'Paccy@123456789',
  database:'spotify_clone',
  synchronize: true,
 }),
 PrismaModule,
 
 SongsModule],

})



export class AppModule implements NestModule {
 
  configure(consumer: MiddlewareConsumer) {
    consumer.
         apply(LoggerMiddleware)
         .forRoutes("songs")
         
  }
}
