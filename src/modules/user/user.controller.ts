import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @UseGuards(JwtGuard)
    @Get("me")
    getMe(
        @GetUser() user:User,
     
    ){
        return user;
    }

    // editing user information

    @UseGuards(JwtGuard)
    @Put(":id")
    editUser(
        @Param("id",ParseIntPipe) id:number,
        @Body() dto:UpdateUserDto){
    
            return this.userService.editUser(id,dto)
    }

    // deleting user

    deleteAccount(){

    }
}
