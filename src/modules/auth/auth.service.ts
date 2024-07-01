import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SigninDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
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
}
