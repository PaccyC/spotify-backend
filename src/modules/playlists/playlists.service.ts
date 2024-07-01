import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistsService {

    constructor(private prisma:PrismaService){}

    async createPlaylist(
        userId:number,
        dto:CreatePlaylistDto){

        const playlist = await this.prisma.playlist.create({
            data:{
                ...dto,
                userId,

            }

        })
        return playlist
    }


    async getPlaylists(
        userId:number
    ){

        const playlists= await this.prisma.playlist.findMany({
            where:{
                userId
            }
        });
        return playlists;
    }
}
