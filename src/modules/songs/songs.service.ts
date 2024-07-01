import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/CreateSong.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async createSong(createSongDto: CreateSongDto) {
    const { artists, ...rest } = createSongDto;

    const song = await this.prisma.song.create({
      data: {
        ...rest,
        datereleased: new Date(createSongDto.datereleased),
        duration: new Date(`1970-01-01T${createSongDto.duration}Z`),
        artists: {
          connect: artists.map((id) => ({ id })),
        },
      },
    });

    return song;
  }

  async getAllSongs() {
    return this.prisma.song.findMany({
      include: {
        artists: true,
      },
    });
  }

  async getOneSong(id: number) {
    return this.prisma.song.findUnique({
      where: { id },
      include: { artists: true },
    });
  }

  async updateSong(id: number, updateSongDto: CreateSongDto) {
    const { artists, ...rest } = updateSongDto;

    const song = await this.prisma.song.update({
      where: { id },
      data: {
        ...rest,
        datereleased: new Date(updateSongDto.datereleased),
        duration: new Date(`1970-01-01T${updateSongDto.duration}Z`),
        artists: {
          connect: artists.map((id) => ({ id })),
        },
      },
    });

    return song;
  }

  async removeSong(id: number) {
    return this.prisma.song.delete({
      where: { id },
    });
  }
}
