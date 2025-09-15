import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserPayload } from '../types/user-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // no valida token
    }
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    // Verificar en la base de datos
    const user: UserPayload | null = await this.authService.validateToken(token);

    if (!user) throw new UnauthorizedException('Token inválido o expirado');

    // Adjuntar el usuario al request para usarlo en los controladores
    req.user = user;

    return true;
  }
}
