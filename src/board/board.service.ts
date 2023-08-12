import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardColor } from '../entity/board.entity';
import { Member } from '../entity/member.entity';
import { Waiting } from '../entity/waiting.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Waiting) private waitingRepository: Repository<Waiting>,
    @InjectRepository(User) private userRepository: Repository<User>,
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
  async getBoard(user_id: number, board_id: number) {
    const board = await this.boardRepository.query(
      `Select board.board_id, board.name as '보드이름', list.name as '리스트이름', card.name as '카드이름' from board 
      inner join list on board.board_id = list.board_id
      inner join card on list.list_id = card.list_id 
      where board.board_id = ${board_id}`,
    );
  }
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

  async createWaiting(board_id: number, userId: number, inviteEmail: string) {
    try {
      // userId는 로그인한 유저임
      const boardOwner = await this.boardRepository.query(
        `SELECT * FROM board WHERE board_id=${board_id}`,
      );
      if (userId !== boardOwner[0].user_id) {
        throw new UnauthorizedException('보드 생성자만이 초대할 수 있습니다.');
      }
      // 초대할 유저 정보
      const inviteUser = await this.userRepository.findOne({
        where: { email: inviteEmail },
        select: ['user_id'],
      });
      if (userId === inviteUser.user_id) {
        throw new BadRequestException('본인을 초대할 수 없습니다.');
      }
      const checkWaitUser = await this.waitingRepository.findOne({
        where: { user_id: inviteUser.user_id, board_id },
      });
      if (checkWaitUser) {
        throw new BadRequestException('초대중인 유저입니다.');
      }
      const checkMemberUser = await this.memberRepository.findOne({
        where: { user_id: inviteUser.user_id, board_id },
      });
      console.log(checkMemberUser);
      if (checkMemberUser) {
        throw new BadRequestException('초대가 완료된 유저입니다.');
      }
      if (inviteUser) {
        this.waitingRepository.insert({
          user_id: inviteUser.user_id,
          board_id: board_id,
        });
      }
    } catch (error) {
      throw error;
    }
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
