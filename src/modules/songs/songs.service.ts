import { Injectable } from '@nestjs/common';
import { createSongDto } from './dto/CreateSong.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {

    constructor (private prisma:PrismaService){}

    async createSong(createSongDto:createSongDto){
    
        const song = await this.prisma.song.create({
            data:createSongDto
        })
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
