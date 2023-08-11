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
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async getComment(card_id: number) {
    return await this.commentRepository.find({
      where: [{ deletedAt: null }, { card_id: card_id }],
      select: ['comment', 'name', 'createdAt', 'updatedAt'],
    });
  }
  createComment(
    user_id: number,
    name: string,
    card_id: number,
    comment: string,
  ) {
    return this.commentRepository.insert({
      user_id,
      card_id,
      comment,
      name,
    });
  }
  async updateComment(user_id: number, comment_id: number, comment: string) {
    const pickComment = await this.commentRepository.findOne({
      where: { comment_id },
    });
    if (_.isNil(pickComment)) {
      throw new NotFoundException(
        `댓글 번호 ${comment_id}번의 댓글을 찾을 수 없습니다.`,
      );
    }
    if (pickComment.user_id !== user_id) {
      throw new UnauthorizedException('작성자만 수정 가능합니다.');
    }
    await this.commentRepository.update(comment_id, { comment });
  }
  async deleteComment(user_id: number, comment_id: number) {
    const pickComment = await this.commentRepository.findOne({
      where: { comment_id },
    });
    if (_.isNil(pickComment)) {
      throw new NotFoundException(
        `댓글 번호 ${comment_id}번의 댓글을 찾을 수 없습니다.`,
      );
    }
    if (pickComment.user_id !== user_id) {
      throw new UnauthorizedException('작성자만 삭제 가능합니다.');
    }
    await this.commentRepository.softDelete(comment_id);
  }
}
