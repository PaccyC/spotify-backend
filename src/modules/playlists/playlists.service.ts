import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(private prisma: PrismaService) {}

  async createPlaylist(userId: number, dto: CreatePlaylistDto) {
    const { name, description } = dto;

    const playlist = await this.prisma.playlist.create({
      data: {
        userId,
        name,
        description,
      },
    });

    return playlist;
  }

  async addSongToPlaylist(updatePlaylistDto: UpdatePlaylistDto, userId: number) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id: updatePlaylistDto.playlistId },
      include: { user: true },
    });

    if (!playlist || playlist.userId !== userId) {
      throw new ForbiddenException('Access to this playlist is forbidden');
    }

    return this.prisma.playlist.update({
      where: { id: updatePlaylistDto.playlistId },
      data: {
        songs: {
          connect: { id: updatePlaylistDto.songId },
        },
      },
    });
  }

  async removeSongFromPlaylist(updatePlaylistDto: UpdatePlaylistDto, userId: number) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id: updatePlaylistDto.playlistId },
      include: { user: true },
    });

    if (!playlist || playlist.userId !== userId) {
      throw new ForbiddenException('Access to this playlist is forbidden');
    }

    return this.prisma.playlist.update({
      where: { id: updatePlaylistDto.playlistId },
      data: {
        songs: {
          disconnect: { id: updatePlaylistDto.songId },
        },
      },
    });
  }

  async getPlaylists(userId: number) {
    return this.prisma.playlist.findMany({
      where: { userId },
      include: { songs: true },
    });
  }
}
