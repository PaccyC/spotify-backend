import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/CreateSong.dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  createSong(@Body() createSongDto: CreateSongDto) {
    return this.songsService.createSong(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.getAllSongs();
  }

  @Get(':id')
  findOneSong(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.getOneSong(id);
  }

  // @Put(':id')
  // updateSong(@Param('id', ParseIntPipe) id: number, @Body() updateSongDto: CreateSongDto) {
  //   return this.songsService.updateSong(id, updateSongDto);
  // }

  @Delete(':id')
  deleteSong(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.removeSong(id);
  }
}
