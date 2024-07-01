import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async createArtist(createArtistDto: CreateArtistDto) {
    const {  ...rest } = createArtistDto;

    const artist = await this.prisma.artist.create({
      data: {
        ...rest,
       
      },
    });

    return artist;
  }

  async getAllArtists() {
    return this.prisma.artist.findMany({
      include: {
        song: true,
      },
    });
  }
}
