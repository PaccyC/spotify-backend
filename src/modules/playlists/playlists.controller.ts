import { Body, Controller, Get, Post, UseGuards, Param, Patch } from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto';
import { PlaylistsService } from './playlists.service';
import { JwtGuard } from '../auth/guard';

@Controller('playlists')
@UseGuards(JwtGuard)
export class PlaylistController {
  constructor(private playlistService: PlaylistsService) {}

  @Get()
  getPlaylists(@GetUser("id") userId: number) {
    return this.playlistService.getPlaylists(userId);
  }

  @Post()
  createPlaylist(@GetUser("id") userId: number, @Body() dto: CreatePlaylistDto) {
    return this.playlistService.createPlaylist(userId, dto);
  }

  @Patch('add-song')
  addSongToPlaylist(@GetUser("id") userId: number, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.addSongToPlaylist(updatePlaylistDto, userId);
  }

  @Patch('remove-song')
  removeSongFromPlaylist(@GetUser("id") userId: number, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.removeSongFromPlaylist(updatePlaylistDto, userId);
  }
}
