import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from './modules/songs/songs.module';
import { LoggerMiddleware } from 'logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [SongsModule, AuthModule, PrismaModule],
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
