import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import dotenv
import * as dotenv from 'dotenv';
import { AuthService } from 'src/service/auth.service';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any, password: string): Promise<any> {
    const user = await this.authService.validateUser(payload, () => { });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}