import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from './modules/songs/songs.module';
import { LoggerMiddleware } from 'logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './modules/user/user.service';
import { ArtistsModule } from './modules/artists/artists.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
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
 
 SongsModule,
 
 ArtistsModule,
 
 PlaylistsModule],
  providers: [UserService],

})



export class AppModule implements NestModule {
 
  configure(consumer: MiddlewareConsumer) {
    consumer.
         apply(LoggerMiddleware)
         .forRoutes("songs")
         
  }
}
