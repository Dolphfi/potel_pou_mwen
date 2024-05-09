import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { LoginInput } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users:Repository<User>, 
  private readonly config: ConfigService, private readonly jwtService: JwtService){}

async createAccount({email, password, role}: CreateAccountInput): Promise<[boolean ,string?]>{
    try {
      const userExiste = await this.users.findOne({where: {email}});
      if (userExiste) {
      return [false,'There is a user with that email already'];
      }
      await this.users.save(this.users.create({email, password, role}));
      return [true];
    } catch (error) {
      return [false,`Couldn't create account`];
    }

  }

  async login({email, password}: LoginInput): Promise<{ok: boolean ,error: string, token?:string}>{
    try {
      const user = await this.users.findOne({where: {email}});
      if (!user) {
        return{
          ok: false,
          error: `User with  ${email} not exist`,
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sing(user.id);
       return {
        ok: true,
        token,
        error:'',
       };
    } catch (error) {
      return {ok: false, error};
    }
  }

  async findById(id:number):Promise<User>{
    return this.users.findOne({where: {id}});
  }
}
