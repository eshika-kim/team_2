import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get('/waiting')
  async getWaitings() {
    return await this.boardService.getWaitings();
  }

  @Post('/waiting/:board_id')
  createWaiting(@Param('board_id') board_id: number) {
    return this.boardService.createWaiting(board_id);
  }

  @Post('/member/:board_id')
  createMember(@Param('board_id') board_id: number) {
    return this.boardService.createMember(board_id);
  }

  @Delete('/waiting/:board_id')
  async deleteWaiting(@Param('board_id') board_id: number) {
    return await this.boardService.deleteWaiting(board_id);
  }

  @Delete('/member/:board_id')
  async deleteMember(@Param('board_id') board_id: number) {
    return await this.boardService.deleteMember(board_id);
  }

  @Put('/board/:board_id')
  async updateBoard(
    @Param('board_id') board_id: number,
    @Body() data: UpdateBoardDto,
  ) {
    return await this.boardService.updateBoard(
      board_id,
      data.name,
      data.color,
      data.description,
    );
  }

  @Delete('/board/:board_id')
  async deleteBoard(@Param('board_id') board_id: number) {
    return await this.boardService.deleteBoard(board_id);
  }
}
