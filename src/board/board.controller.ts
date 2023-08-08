import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from '../dto/board/create-board.dto';
import { UpdateBoardDto } from '../dto/board/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/board')
  async getBoards() {
    return await this.boardService.getBoards();
  }

  @Post('/board')
  createBoard(@Body() data: CreateBoardDto) {
    return this.boardService.createBoard(
      data.name,
      data.color,
      data.description,
    );
  }

  @Put('/board/:board_id')
  async updateBoard(
    @Param('board_id') board_id: number,
    @Body() data: UpdateBoardDto,
  ) {
    return await this.boardService.updateBoard(board_id, data.name);
  }

  @Delete('/board/:board_id')
  async deleteArticle(@Param('board_id') articleId: number) {
    return await this.boardService.deleteArticle(board_id);
  }
}
