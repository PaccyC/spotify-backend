import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async editUser(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10) ;

      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username: dto.username,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientUnknownRequestError) {
        throw new ForbiddenException("Error updating user details");
      }
      throw new NotFoundException("User doesn't exist");
    }
  }
}
