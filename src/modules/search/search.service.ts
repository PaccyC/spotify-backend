import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {

    constructor(private prisma:PrismaService){}

    async search(dto:SearchDto){

        const searchResults= await Promise.all([
            this.prisma.song.findMany({
                where:{
                    OR:[
                        {title:{contains:dto.query} },
                        {artists:{some:{name:{contains:dto.query}}}}
                    ]
                }
            }),
            this.prisma.playlist.findMany({
                where:{
                    OR:[
                        {name:{contains:dto.query}},
                        {description:{contains:dto.query}}
                    ]
                },
                include: { songs: true }
            }),
            this.prisma.artist.findMany({
                where:{
                    OR:[
                        {name:{contains:dto.query}}
                    ]
                }
            })
        ])


        return {
            songs:searchResults[0],
            playlists:searchResults[1],
            artists:searchResults[2]
        }

    }


}
