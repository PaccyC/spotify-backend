import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CreatePlaylistDto } from './dto';
import { PlaylistsService } from './playlists.service';
import { JwtGuard } from '../auth/guard';

@Controller('playlists')
export class PlaylistController {

    constructor(private playlistService:PlaylistsService){}

  
    

    @Get()
    @UseGuards(JwtGuard)
    getPlaylists(@GetUser("id") userId: number){
        return this.playlistService.getPlaylists(userId)
    }

    @Post()
    @UseGuards(JwtGuard)
    createPlaylist(@GetUser("id") userId: number,

                    @Body() dto:CreatePlaylistDto){

                        return this.playlistService.createPlaylist(userId,dto)
    }

    
    
}

