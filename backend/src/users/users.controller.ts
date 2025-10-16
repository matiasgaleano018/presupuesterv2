import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserById(@GetUser() req: Auth) {
    const authUserInfo = req;
    const userInfo = await this.usersService.getUserInfoById(authUserInfo.user.id);
    return userInfo;
  }

  @Put('/')
  async updateUser(@GetUser() req: Auth, @Body() user: UpdateUserDto) {
    const id = req.user.id;
    return await this.usersService.updateUser(id, user);
  }
}
