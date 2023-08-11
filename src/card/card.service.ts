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
import { Comment } from 'src/entity/comment.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  // 카드 목록 가져오기
  async getCard() {
    const result = await this.cardRepository.find({
      where: { deletedAt: null },
      select: ['name'],
    });
    return result;
  }

  // 카드 상세 조회 + 댓글
  async detailCard(card_id: number) {
    const comment = await this.getComment(card_id);
    const card = await this.cardRepository.findOne({
      where: { deletedAt: null },
      select: ['description', 'createdAt', 'card_color', 'dueDate', 'state'],
    });
    const result = [card, ...comment];
    return result;
  }

  // 카드 생성
  createCard(
    list_id: number,
    name: string,
    card_color: string,
    description: string,
    dueDate: string,
    state: StateEnum,
  ) {
    this.cardRepository.query(
      `INSERT INTO card (list_id, name, card_color, description, dueDate, state, \`order\`)
      SELECT ${list_id}, '${name}', '${card_color}', '${description}', '${dueDate}', '${state}',
<<<<<<< Updated upstream
             COALESCE(MAX(\`order\`) + 1, 1) FROM card WHERE list_id = ${list_id};`,
=======
             COALESCE(MAX(\`order\`) + 1, 1) FROM card WHERE list_id = ${list_id}};`,
>>>>>>> Stashed changes
    );
  }

  // 카드 수정
  async updateCard(
    user_id: number,
    name: string,
    card_color: string,
    description: string,
    dueDate: string,
    state: StateEnum,
  ) {
    await this.checkCard(user_id);
    this.cardRepository.update(user_id, {
      name,
      card_color,
      description,
      dueDate,
      state,
    });
  }

  async updateCardOrder(card_id: number, list_id: number, order: number) {
    await this.cardRepository.query(
      `UPDATE card SET order =
            CASE WHEN order >= ${order} AND card_id != ${card_id} THEN ${order} + 1
                 WHEN card_id = ${card_id} THEN ${order}
                 ELSE order
            END
        WHERE list_id = ${list_id};`,
    );
  }

  async updateCardWhere(card_id: number, list_id: number, order: number) {
    await this.cardRepository.update(card_id, { list_id });
    await this.updateCardOrder(card_id, list_id, order);
  }

  // 카드 삭제
  async deleteCard(card_id: number) {
    await this.checkCard(card_id);
    this.cardRepository.softDelete(card_id);
  }

  // 카드 유무 존재 확인 로직
  private async checkCard(card_id: number) {
    const card = await this.cardRepository.findOne({
      where: { card_id, deletedAt: null },
    });
    if (_.isNil(card)) {
      throw new NotFoundException(`Card not found. id: ${card_id}`);
    }
    return card;
  }

  // 작성한 유저가 맞는지 확인하는 로직
  private async userCheck(user_id: number, cardUser_id: number) {}

  // 카드 내 코멘트 가져오는 로직
  private async getComment(card_id: number) {
    return await this.commentRepository.find({
      where: [{ deletedAt: null }, { card_id: card_id }],
      select: ['comment', 'name', 'createdAt', 'updatedAt'],
    });
  }
}
