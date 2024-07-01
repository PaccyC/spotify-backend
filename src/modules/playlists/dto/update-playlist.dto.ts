import { IsInt, IsNotEmpty } from "class-validator";

export class UpdatePlaylistDto{

  @IsInt()
  @IsNotEmpty()
  playlistId: number;

  @IsInt()
  @IsNotEmpty()
  songId: number;
}