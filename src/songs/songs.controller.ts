import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {


   @Post()
   createSong(){
     return {message:"New song created"}
   }

    @Get()
    findAll(){
     return {message:"All songs are available"}
    }

    // Getting a specific song

    @Get(':id')
    findOneSong(@Param('id') id: string){
     return {message:"Song with id :"+id}
    }

    // Updating a song

    @Put(":id")
    updateSong(@Param('id') id: string){
     return {message:"Song with id :"+id+" updated"}
    }

    // deleting a song

    @Delete(":id")
    deleteSong(@Param('id') id: string){
     return {message:"Song with id :"+id+" deleted"}
    }

}
