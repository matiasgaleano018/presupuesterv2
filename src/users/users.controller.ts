import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserById(@GetUser() req: Auth) {
    const authUserInfo = req;
    const userInfo = await this.usersService.getUserInfoById(authUserInfo.user.id);
    return userInfo;
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return await this.usersService.updateUser(id, user);
  }
}
