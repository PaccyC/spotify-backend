import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SigninDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}
    @Post("/signup")
     signup(
      @Body() dto:CreateUserDto
     ){
  return this.authService.signup(dto);
    }

    @Post("/signin") 
    signin(
      @Body() dto:SigninDto
    ){
  return this.authService.signin(dto);
    }

    @Post('/request-password-reset')
    async requestPasswordReset(
      @Body('email') email:string 
    ){
      return this.authService.sendPasswordResetEmail(email)
    }

    async resetPassword(
     @Query('token') token:string,
     @Body('newPassword') newPassword:string
    ){
      return this.authService.resetPassword(token,newPassword)
    }
}
