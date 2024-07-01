import { IsArray, IsDateString, IsInt, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";


export class createSongDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    @IsInt({ each: true })
    artists: number[];

    @IsDateString()
    @IsNotEmpty()
    datereleased: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    @IsString()
    duration: Date


}