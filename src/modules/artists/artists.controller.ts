import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Post()
  addArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Get()
  findAll() {
    return this.artistService.getAllArtists();
  }
}
