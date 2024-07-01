import { Module } from '@nestjs/common';
import { PlaylistController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  controllers: [ PlaylistController],
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
