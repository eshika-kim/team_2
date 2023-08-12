import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardColor } from '../entity/board.entity';
import { Member } from '../entity/member.entity';
import { Waiting } from '../entity/waiting.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Waiting) private waitingRepository: Repository<Waiting>,
  ) {}

  async getBoards(user_id: number) {
    const board = this.boardRepository.createQueryBuilder('board');

    return await board
      .where(
        'deletedAt IS NULL AND board_id IN' +
          board
            .subQuery()
            .select('member.board_id')
            .from(Member, 'member')
            .where(`member.user_id = ${user_id} AND deletedAt IS NULL`)
            .getQuery(),
      )
      .select([
        'board.board_id',
        'board.user_id',
        'board.name',
        'board.color',
        'board.description',
      ])
      .getMany();
  }

  // async getBoard(user_id: number, board_id: number) {
  //   const board = await this.boardRepository.query(
  //     `Select board.board_id, board.name as '보드이름', list.name as '리스트이름', card.name as '카드이름' from board
  //     inner join list on board.board_id = list.board_id
  //     inner join card on list.list_id = card.list_id
  //     where board.board_id = ${board_id}`,
  //   );
  // }

  async createBoard(
    user_id: number,
    name: string,
    color: BoardColor,
    description: string,
  ) {
    const boardCreate = await this.boardRepository.insert({
      user_id,
      name,
      color,
      description,
    });
    if (boardCreate) {
      await this.memberRepository.insert({
        user_id,
        board_id: boardCreate.identifiers[0].board_id,
      });
    }
  }

  async getWaitings(user_id: number) {
    return await this.waitingRepository.query(
      `SELECT waiting.board_id, board.name as name
           FROM waiting
          INNER JOIN board on board.board_id = waiting.board_id
          WHERE waiting.user_id = ${user_id}`,
    );
  }

  async createWaiting(board_id: number, user_id: number) {
    await this.waitingRepository.insert({
      board_id,
      user_id,
    });
  }

  async createMember(board_id: number, user_id: number) {
    this.memberRepository.insert({
      board_id,
      user_id,
    });
    await this.deleteWaiting(board_id, user_id);
  }

  async deleteWaiting(board_id: number, user_id: number) {
    await this.waitingRepository.delete({ board_id, user_id });
  }

  async deleteMember(board_id: number) {
    await this.memberRepository.delete({ board_id, user_id: null });
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
