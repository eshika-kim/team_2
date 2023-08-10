import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    try {
      req.locals = {};
      const authHeader = req.cookies;
      if (!authHeader) {
        throw new UnauthorizedException('JWT not found');
      }
      const authkey = authHeader.authentication;
      const [authType, token] = authkey.split(' ');
      if (authType !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          'It is not Bearer type of token or abnormal token',
        );
      }
      const payload = await this.jwtService.verify(token);
      req.locals.user = payload;
      next();
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid JWT');
    }
  }
}
