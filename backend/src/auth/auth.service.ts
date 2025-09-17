import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private usersService: UsersService,

        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
    ) {}

    async register(user: CreateUserDto){
        return await this.usersService.createUser(user);
    }

    async singIn(login: LoginDto) {
        const user = await this.usersService.validateUser(login.email, login.password);
        if( !user ){
            throw new UnauthorizedException('Email o contraseña incorrectos');
        }

        return this._signIn(user);
    }

    private async _signIn(user: User) {
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

        const now = new Date();
        const accessExp = new Date(now.getTime() + 60 * 60 * 1000); // +1h
        const refreshExp = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30d

        const authRecord = this.authRepository.create({
            user_id: user.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            access_expires_at: accessExp,
            refresh_expires_at: refreshExp,
        });

        await this.authRepository.save(authRecord);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refreshToken(refreshDto: RefreshDto) {
        const record = await this.authRepository.findOne({
            where: { user_id: refreshDto.user_id, refresh_token: refreshDto.refresh_token },
        });

        if (!record) throw new Error('Refresh token inválido');

        if (record.refresh_expires_at < new Date()) {
            throw new Error('Refresh token expirado');
        }

        const payload = { sub: refreshDto.user_id };
        const newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

        record.access_token = newAccessToken;
        record.access_expires_at = new Date(Date.now() + 60 * 60 * 1000);

        await this.authRepository.save(record);

        return {
            access_token: newAccessToken,
            refresh_token: refreshDto.refresh_token,
        };
    }

    async validateToken(token: string): Promise<Auth | null> {
        return await this.authRepository.findOne({
            where: {
                access_token: token,
                access_expires_at: MoreThan(new Date()),
            },
            relations: ['user'],
        });
    }

}
