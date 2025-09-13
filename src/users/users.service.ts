import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private configService: ConfigService,
  ) {}

  async getUserInfoById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  private async emailExists(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if(user) return email;
    return false;
  }

  private async hashPassword(password: string) {
    const secretWord = this.configService.get<string>('SECRET_WORD');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + secretWord, salt);
    return hashedPassword;
  }

  private async comparePassword(password: string, hashedPassword: string) {
    const secretWord = this.configService.get<string>('SECRET_WORD');
    return bcrypt.compare(password + secretWord, hashedPassword);
  }

  async createUser (user: CreateUserDto) {
    if (await this.emailExists(user.email)) {
      throw new BadRequestException('Email ya registrado');
    }
    
    const hashedPassword = await this.hashPassword(user.password);

    const userToSave = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: hashedPassword
    };

    return this.usersRepository.save(userToSave);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;
    const validPassword = await this.comparePassword(password, user.password);
    if (!validPassword) return null;
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userInfo = await this.getUserInfoById(id);
    if(!userInfo) {
      throw new BadRequestException('Usuario no encontrado');
    }
    
    if (user.email !== userInfo.email && await this.emailExists(user.email)) {
      throw new BadRequestException('Email ya registrado');
    }
    return this.usersRepository.update(id, user);
  }

  private async _changePassword(id: number, oldPassword: string, newPassword: string) {
    const userInfo = await this.getUserInfoById(id);
    if(!userInfo) {
      throw new BadRequestException('Usuario no encontrado');
    }
    const validPassword = await this.comparePassword(oldPassword, userInfo.password);
    if(!validPassword) {
      throw new BadRequestException('Contraseña incorrecta');
    }
    const hashedPassword = await this.hashPassword(newPassword);
    return this.usersRepository.update(id, { password: hashedPassword });
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const userInfo = await this.usersRepository.findOne({ where: { email } });
    if(!userInfo) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return this._changePassword(userInfo.id, oldPassword, newPassword);
  }
}
