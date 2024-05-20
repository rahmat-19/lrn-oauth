import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-dto';
import { EntityNotFoundError } from 'typeorm';
import { Role } from 'src/common/enums/role';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ username });

    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.userService.fineOneByEmail(email);
    

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        email: user.email,
        sub: user.id,
      };
      user['access_token'] = this.jwtService.sign(payload);
      const { password, created, updated, ...result } = user;

      return result;
    }
    throw new BadRequestException('Invalid Credential');
  }

  async logout(userId: string) {
    const user = await this.userService.findOne(userId);
  }

  async googleLogin(user: any) {

    const payload = { email: user.email, sub: user.accessToken };
    

    const userValidaton = await this.userService.fineOneByEmail(user.email)
    if (!userValidaton) {
      this.userService.create({
        email: String(user.email),
        name: (`${user.firstName} ${user.lastName}`).trim(),
        provider: 'google',
        password: null
      })
    }
    
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = user.refreshToken; // You should save this in a secure storage (e.g., database)

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const newAccessToken = response.data.access_token;
    return newAccessToken;
  }
}
