import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';
import { CardRepository } from './card.repository';
import { UserRepository } from '../card/card.repository';
import { StateEnum } from 'src/entity/card.entity';

@Injectable()
export class CardService {
  constructor(
    private cardRepository: CardRepository,
    @Inject(UserRepository) private userRepository: UserRepository
  ) {}

  
// 왜 조회가 어렵지..?
  async getCard() {
    const cards = await this.cardRepository.getCard()
    if(!_.isNil(cards)){
      return cards
    }
    const result = await this.cardRepository.find({
      where: {deletedAt:null},
      select : ["description"]
    })
    return result
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
    state: StateEnum,
  ) {
    await this.checkPassword(user_id);
    this.cardRepository.update(user_id, {
      name,
      color,
      description,
      dueDate,
      state,
    });
  }

  async deleteCard(user_id: number,) {
    await this.checkPassword(user_id);
    this.cardRepository.softDelete(user_id);
  }

  private async checkPassword(user_id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id, deletedAt: null },
      select: [],
    });
    if (_.isNil(user)) {
      throw new NotFoundException(`Card not found. id: ${user_id}`);
    }
  }
}
