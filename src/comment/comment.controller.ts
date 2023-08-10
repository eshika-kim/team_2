import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dto/comment/create-comment.dto';
import { UpdateCommentDto } from 'src/dto/comment/update-comment.dto';
import { Request, Response } from 'express';
interface RequestWithLocals extends Request {
  locals: {
    user: {
      id: number;
      name: string;
    };
  };
}

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
    @Body() data: CreateCommentDto,
    @Req() request: RequestWithLocals,
  ) {
    const auth = request.locals.user;
    return this.commentService.createComment(
      auth.id,
      auth.name,
      card_id,
      data.comment,
    );
  }
  @Put('/:comment_id')
  async updateComment(
    @Param('comment_id') comment_id: number,
    @Body() data: UpdateCommentDto,
    @Req() request: RequestWithLocals,
  ) {
    const auth = request.locals.user;
    return await this.commentService.updateComment(
      auth.id,
      comment_id,
      data.comment,
    );
  }
  @Delete('/:comment_id')
  async deleteComment(
    @Param('comment_id') comment_id: number,
    @Req() request: RequestWithLocals,
  ) {
    const auth = request.locals.user;
    return await this.commentService.deleteComment(auth.id, comment_id);
  }
}
