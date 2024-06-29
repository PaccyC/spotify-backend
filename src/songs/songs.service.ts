import { Injectable } from '@nestjs/common';
import { createSongDto } from './dto/CreateSong.dto';

@Injectable()
export class SongsService {


    async createSong(createSongDto:createSongDto){
    
    }

    // Getting all songs

    async  getAllSongs(){

    }
    async  getOneSong(id: number){

    }

    // updating song information

    async updateSong(id:number){

    }

    // remove song 

    async removeSong(id:number){

    }

}
