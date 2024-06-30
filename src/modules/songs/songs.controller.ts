import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { createSongDto } from './dto/CreateSong.dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService:SongsService){}

   @Post()
   createSong(@Body() createSongDto:createSongDto){
     return this.songsService.createSong(createSongDto)
   }

    @Get()
    findAll(){
     return this.songsService.getAllSongs();
    }

    // Getting a specific song

    @Get(':id')
    findOneSong(@Param('id') id: string){
     return this.findOneSong(id)
    }

    // Updating a song

    @Put(":id")
    updateSong(@Param('id',ParseIntPipe) id: number){
     return this.songsService.updateSong(id);
    }

    // deleting a song

    @Delete(":id")
    deleteSong(@Param('id',ParseIntPipe) id: number){
     return this.songsService.removeSong(id)
    }

}
