import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { Comment } from 'src/entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}
  async getComment(card_id: number) {
    return await this.commentRepository.find({
      where: [{ deletedAt: null }, { card_id: card_id }],
      select: ['comment', 'name', 'createdAt', 'updatedAt'],
    });
  }
  createComment(card_id: number, comment: string) {
    // 댓글 달기 전에 존재하는 회원인지, 인가(멤버)된 회원인지
    // 존재하는 회원을 검색할 필요는 없다. 인가된 회원인가 아닌가를 검색하면
    // 존재하는 회원임과 인가된 회원임을 알 수 있기 때문에

    return this.commentRepository.insert({
      card_id,
      name: 'test', // 아직 user 부분 못만들어서
      comment,
    });
  }
  async updateComment(comment_id: number, comment: string) {
    const pickComment = await this.commentRepository.findOne({
      where: { comment_id },
    });
    if (_.isNil(pickComment)) {
      throw new NotFoundException(
        `댓글 번호 ${comment_id}번의 댓글을 찾을 수 없습니다.`
      );
    }
    await this.commentRepository.update(comment_id, { comment });
  }
  async deleteComment(comment_id: number) {
    const pickComment = await this.commentRepository.findOne({
      where: { comment_id },
    });
    if (_.isNil(pickComment)) {
      throw new NotFoundException(
        `댓글 번호 ${comment_id}번의 댓글을 찾을 수 없습니다.`
      );
    }
    await this.commentRepository.softDelete(comment_id);
  }
}
