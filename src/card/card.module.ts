import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardRepository } from './card.repository'
import {Card} from '../entity/card.entity'


@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService,CardRepository]
})
export class CardModule {}
