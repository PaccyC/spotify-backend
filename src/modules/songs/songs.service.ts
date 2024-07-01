import { Injectable } from '@nestjs/common';
import { createSongDto } from './dto/CreateSong.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {

    constructor (private prisma:PrismaService){}

    async createSong(createSongDto:createSongDto){
    
        const{artists, ...rest} = createSongDto;
       
        const song= await this.prisma.song.create({
            data:{
                ...rest,
                datereleased: new Date(createSongDto.datereleased), // Convert to Date object
                duration: new Date(`1970-01-01T${createSongDto.duration}Z`),
                artists:{
                    connect:artists.map(id =>({id}))
                }
            }
        })

        return song;
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
