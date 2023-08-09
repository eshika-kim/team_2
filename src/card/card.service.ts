import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card, StateEnum } from 'src/entity/card.entity';

@Injectable()
export class CardService {
  // constructor(
  //   private cardRepository: CardRepository,
  //   @Inject(UserRepository) private userRepository: UserRepository
  // ) {}
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>
  ) {}

  // 왜 조회가 어렵지..?
  async getCard() {
    // const cards = await this.cardRepository.getCard()
    // if(!_.isNil(cards)){
    //   return cards
    // }
    const result = await this.cardRepository.find({
      where: { deletedAt: null },
      select: ['description'],
    });
    return result;
  }

  createCard(
    name: string,
    color: string,
    description: string,
    dueDate: Date,
    state: StateEnum
  ) {
    this.cardRepository.insert({
      name,
      color,
      description,
      dueDate,
      state,
    });
  }

  async updateCard(
    user_id: number,
    name: string,
    color: string,
    description: string,
    dueDate: Date,
    state: StateEnum
  ) {
    await this.checkCard(user_id);
    this.cardRepository.update(user_id, {
      name,
      color,
      description,
      dueDate,
      state,
    });
  }

  async deleteCard(card_id: number) {
    await this.checkCard(card_id);
    this.cardRepository.softDelete(card_id);
  }

  private async checkCard(card_id: number) {
    const card = await this.cardRepository.findOne({
      where: { card_id, deletedAt: null },
      select: [],
    });
    if (_.isNil(card)) {
      throw new NotFoundException(`Card not found. id: ${card_id}`);
    }
  }
}
