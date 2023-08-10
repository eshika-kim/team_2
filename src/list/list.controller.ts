import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from '../dto/list/create-list.dto';
import { UpdateListDto } from '../dto/list/update-list.dto';

@Controller('list')
export class listController {
  constructor(private readonly cardService: ListService) {}

  @Get('/:board_id')
  async getList(@Param('board_id') board_id: number) {
    return await this.cardService.getList(board_id);
  }

  @Post('/:board_id')
  createList(@Param('board_id') board_id: number, @Body() data: CreateListDto) {
    return this.cardService.createList(board_id, data.name);
  }

  @Patch('/:list_id')
  updateList(@Param('list_id') list_id: number, @Body() data: UpdateListDto) {
    return this.cardService.updateList(list_id, data.name);
  }

  //리스트 순서 변경
  @Patch('listOrder/:list_id')
  updateListOrder(
    @Param('list_id') list_id: number,
    @Body() data: UpdateListDto,
    @Query('boad_id') board_id: number,
  ) {
    return this.cardService.updateListOrder(board_id, list_id, data.order);
  }

  @Delete('/:list_id')
  deleteList(@Param('list_id') list_id: number) {
    return this.cardService.deleteList(list_id);
  }
}
