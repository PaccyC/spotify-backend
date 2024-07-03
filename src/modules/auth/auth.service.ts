import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SigninDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailerService:MailerService,
  ) {}

  async signup(dto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingUser) {
        throw new ForbiddenException('Email already in use!');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create the new user
      const newUser = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          username: dto.username,
          email: dto.email,
          password: hashedPassword,
        },
      });

      delete newUser.password;
      return this.signToken(newUser.id, newUser.email);

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use!');
        }
      }
      throw error;  
    }
  }
  async signin(dto: SigninDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const match = await bcrypt.compare(dto.password, user.password);

      if (!match) {
        throw new ForbiddenException('Invalid credentials');
      }

      return this.signToken(user.id, user.email);

    } catch (error) {
      throw error;  // Rethrow any errors
    }
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.SECRET,
      expiresIn: '1d',
    });

    return {
      access_token: token,
    };
  }

  // sending password reset email

  async sendPasswordResetEmail(email:string){
    const user = await this.prisma.user.findUnique({
      where:{
        email
      }
    });

    if(!user) {
      throw new Error("User not found")
    }

    const token= this.jwt.sign({email},{expiresIn:"1d"})
    const url = `http://localhost:3000/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
     to:email,
     subject:'Reset Password',
     template:'./reset-passwrd',
     context:{
      name:user.username,
      url,
     },
    });

  }

  // resetting a password

  async resetPassword(token:string,newPassword:string){
    const decoded= this.jwt.verify(token);
    const email= decoded.email;
     
    const hashedPassword= await bcrypt.hash(newPassword,10)

    await this.prisma.user.update({
      where:{email},
      data:{password:hashedPassword},
    })
  }
 
}
