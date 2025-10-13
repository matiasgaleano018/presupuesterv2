import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Auth } from './entities/auth.entity';
import { GetUser } from 'src/decorators/get-user.decorator';

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

    @Get('logout')
    logout(@GetUser() req: Auth){
        const userId = req.user_id;
        return this.authService.logout(userId);
    }

    @Public()
    @Post('testFail')
    testFail(){
        throw new NotFoundException('Test fail, pero llegaste hasta aca');
    }
}
