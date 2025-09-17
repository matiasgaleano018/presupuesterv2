import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Auth]),
        JwtModule.register({
        secret: process.env.JWT_SECRET || '1234567',
        signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService, JwtModule, TypeOrmModule],
})
export class AuthModule {}
