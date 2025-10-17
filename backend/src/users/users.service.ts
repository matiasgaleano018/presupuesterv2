import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserReturn } from './types/user.type';
import { CategoriesService } from '../categories/categories.service';
import { BalanceAccountsService } from '../balance_accounts/balance_accounts.service';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly categoriesService: CategoriesService,

    private readonly balanceAccountsService: BalanceAccountsService,

    private configService: ConfigService,
  ) {}

  async getUserInfoById(id: number): Promise<UserReturn> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }

  private getAllUserInfoById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
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

  async createUser (user: CreateUserDto): Promise<UserReturn> {
    if (await this.emailExists(user.email)) {
      throw new BadRequestException('Email ya registrado');
    }
    
    if(!this.isValidPassword(user.password)) {
      throw new BadRequestException('Contraseña inválida');
    }
    const hashedPassword = await this.hashPassword(user.password);

    const userToSave = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: hashedPassword
    };

    const userSaved = await this.usersRepository.save(userToSave);

    await this.categoriesService.insertDefaultValues(userSaved.id);

    await this.balanceAccountsService.insertDefaultAccount(userSaved.id);

    return {
      id: userSaved.id,
      first_name: userSaved.first_name,
      last_name: userSaved.last_name,
      email: userSaved.email
    };
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
    const userInfo = await this.getAllUserInfoById(id);
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
    if(!this.isValidPassword(newPassword)) {
      throw new BadRequestException('Contraseña inválida');
    }
    return this._changePassword(userInfo.id, oldPassword, newPassword);
  }

  private isValidPassword(password: string): boolean {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    if(password === ""){
      return false;
    }
    if(password.length < 6) {
      return false;
    }
    if(!regex.test(password)) {
      return false;
    }

    return true;
  }
}
