import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from '../src/songs/songs.module';
import { LoggerMiddleware } from 'logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SongsModule, AuthModule],
  controllers: [],
  providers: [],
})



export class AppModule implements NestModule {
 
  configure(consumer: MiddlewareConsumer) {
    consumer.
         apply(LoggerMiddleware)
         .forRoutes("songs")
         
  }
}
