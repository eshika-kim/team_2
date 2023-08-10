import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import _ from 'lodash';
import { CACHE_MANAGER } from '@nestjs/cache-manager/dist';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUserInfo(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['user_id', 'name', 'password'],
    });
  }
  async createUser(email: string, name: string, password: string) {
    // 이미 존재하는 이메일인지 확인 (중복확인)
    const existUser = await this.getUserInfo(email);
    if (!_.isNil(existUser)) {
      throw new ConflictException(
        `This email already has been using. email: ${email}`,
      );
    }
    const insertUser = await this.userRepository.insert({
      email,
      name,
      password,
    });
    // jwt 토큰에 담을 회원의 정보
    const payload = {
      id: insertUser.identifiers[0].id,
      name: insertUser.identifiers[0].name,
    };
    // jwt에 처넣음
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
  async login(email: string, password: string) {
    const userConfirm = await this.getUserInfo(email);
    if (_.isNil(userConfirm)) {
      throw new NotFoundException(`User not found. user email: ${email}`);
    }
    if (userConfirm.password !== password) {
      throw new UnauthorizedException('User password is not corresponded');
    }
    const payload = { id: userConfirm.user_id, name: userConfirm.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async updateUser(user_id: number, password: string, newPassword: string) {
    const confirmUserPass = await this.userRepository.findOne({
      where: { user_id },
      select: ['password'],
    });
    if (!confirmUserPass && password !== confirmUserPass.password) {
      throw new UnauthorizedException('User password is not corresponded');
    }
    return this.userRepository.update(user_id, { password: newPassword });
  }
}
