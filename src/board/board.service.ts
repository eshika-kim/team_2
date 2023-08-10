import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardColor } from '../entity/board.entity';
import { Member } from '../entity/member.entity';
import { Waiting } from 'src/entity/waiting.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Waiting) private waitingRepository: Repository<Waiting>,
  ) {}

  async getBoards() {
    const board = this.boardRepository.createQueryBuilder('board');

    return await board
      .where(
        'deletedAt IS NULL AND board_id IN' +
          board
            .subQuery()
            .select('member.board_id')
            .from(Member, 'member')
            .where(`member.user_id = 1 AND deletedAt IS NULL`)
            .getQuery(),
      )
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

  async getWaitings() {
    const waiting = this.waitingRepository.createQueryBuilder('waiting');

    return await waiting
      .innerJoin('board', 'waiting.board_id = board.board_id')
      .select(['board.name'])
      .getMany();
  }

  async createWaiting(board_id: number) {
    this.waitingRepository.insert({
      board_id,
      // user_id,
    });

    await this.deleteWaiting(board_id);
  }

  async createMember(board_id: number) {
    this.memberRepository.insert({
      board_id,
      // user_id,
    });
  }

  async deleteWaiting(board_id: number) {
    await this.waitingRepository.delete({ board_id });
  }

  async deleteMember(board_id: number) {
    await this.memberRepository.delete({ board_id });
  }

  async updateBoard(
    board_id: number,
    name: string,
    color: BoardColor,
    description: string,
  ) {
    await this.boardRepository.update(board_id, { name, color, description });
  }

  async deleteBoard(board_id: number) {
    await this.boardRepository.softDelete(board_id);
  }
}
