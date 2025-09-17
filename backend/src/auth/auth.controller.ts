import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() login: LoginDto){
        return this.authService.singIn(login);
    }

    @Public()
    @Post('register')
    register(@Body() user: CreateUserDto){
        return this.authService.register(user);
    }

    @Public()
    @Post('refresh')
    refreshToken(@Body() refreshDto: RefreshDto){
        return this.authService.refreshToken(refreshDto);
    }
}
