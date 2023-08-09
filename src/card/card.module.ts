import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardController } from './card.controller';
import { CardService } from './card.service';
import {Card} from '../entity/card.entity'
import { Comment } from '../entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card,Comment])],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
