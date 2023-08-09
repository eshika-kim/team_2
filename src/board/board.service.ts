import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardColor } from '../entity/board.entity';
import { Member } from '../entity/member.entity';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  async getBoards() {
    const board = this.boardRepository.createQueryBuilder('board');

    return await board
      .where('deletedAt IS NULL AND board_id IN' + board.subQuery().select('member.board_id').from(Member, 'member').where(`member.user_id = 1 AND deletedAt IS NULL`).getQuery())
      .select(['board_id', 'user_id', 'name', 'color', 'description'])
      .getMany();
  }

  async createBoard(name: string, color: BoardColor, description: string) {
    this.boardRepository.insert({
      name,
      color,
      description,
    });
  }

  async updateBoard(board_id: number, name: string, color: BoardColor, description: string) {
    await this.boardRepository.update(board_id, { name, color, description });
  }

  async deleteArticle(board_id: number) {
    await this.boardRepository.softDelete(board_id); // soft delete를 시켜주는 것이 핵심!
  }
}
