import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entity/user.entity';
import { Board } from '../entity/board.entity';
import { List } from '../entity/list.entity';
import { Card } from '../entity/card.entity';
import { Comment } from '../entity/comment.entity';
import { Waiting } from 'src/entity/waiting.entity';
import { Member } from 'src/entity/member.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User, Board, Comment, List, Waiting, Member, Card],
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
    };
  }
}
