import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, RolesGuard, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
