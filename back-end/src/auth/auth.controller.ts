import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { AuthGuard } from '@nestjs/passport';
import { Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.googleLogin(req.user);
      res.redirect(`http://localhost:3000?access_token=${token.accessToken}&refresh_token=${token.refreshToken}`);
      return true
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
      return false
    }
  }

  @Post('login')
  login(@Body() user: LoginDTO, @Req() request: Request) {
    return this.authService.login(user.email, user.password);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    try {
      req.res.setHeader('Authorization', null);
      await this.authService.logout(req.user['userId']);
      return 'You have successfully logged out';
    } catch (error) {
      throw new ForbiddenException('Login Failed');
    }
  }
}
