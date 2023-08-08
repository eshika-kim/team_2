import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dto/comment/create-comment.dto';
import { UpdateCommentDto } from 'src/dto/comment/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get('/:card_id')
  async getComment(@Param('card_id') card_id: number) {
    return await this.commentService.getComment(card_id);
  }
  @Post('/:card_id')
  postComment(
    @Param('card_id') card_id: number,
    @Body() data: CreateCommentDto
  ) {
    console.log(data);
    return this.commentService.createComment(card_id, data.comment);
  }
  @Put('/:comment_id')
  async updateComment(
    @Param('comment_id') comment_id: number,
    @Body() data: UpdateCommentDto
  ) {
    return await this.commentService.updateComment(comment_id, data.comment);
  }
  @Delete('/:comment_id')
  async deleteComment(@Param('comment_id') comment_id: number) {
    return await this.commentService.deleteComment(comment_id);
  }
}
