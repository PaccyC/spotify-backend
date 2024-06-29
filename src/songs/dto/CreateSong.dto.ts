import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";


export class createSongDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    artists: string[];

    @IsDateString()
    @IsNotEmpty()
    datereleased: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    duration: Date

}