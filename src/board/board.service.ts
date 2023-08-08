import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private articleRepository: Repository<Board>,
  ) {}

  async getBoards(user_id: number) {
    return await this.articleRepository.find({
      where: { deletedAt: null, user_id },
      select: [
        'board_id',
        'waiting',
        'user_id',
        'name',
        'color',
        'description',
      ],
    });
  }

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
    });
  }

  createArticle(title: string, content: string, password: number) {
    this.articleRepository.insert({
      // 일단, 편의를 위해 author는 잠시 test로 고정합니다.
      author: 'test',
      title,
      content,
      // 마찬가지로, password도 잠시 숫자를 문자열로 바꾸겠습니다.
      // 나중에 암호화된 비밀번호를 저장하도록 하겠습니다.
      password: password.toString(),
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    await this.checkPassword(id, password);
    this.articleRepository.update(id, { title, content });
  }

  async deleteArticle(id: number, password: number) {
    await this.checkPassword(id, password);
    this.articleRepository.softDelete(id); // soft delete를 시켜주는 것이 핵심!
  }

  private async checkPassword(id: number, password: number) {
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });
    if (_.isNil(article)) {
      throw new NotFoundException(`Article not found. id: ${id}`);
    }

    if (article.password !== password.toString()) {
      throw new UnauthorizedException(
        `Article password is not correct. id: ${id}`,
      );
    }
  }
}
