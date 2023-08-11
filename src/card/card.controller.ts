import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from 'src/dto/card/create-card.dto';
import { UpdateCardDto } from 'src/dto/card/update-card.dto';
import { Request } from 'express';
interface RequestWithLocals extends Request {
  locals: {
    user: {
      id: number;
      name: string;
    };
  };
}
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 카드 목록 조회
  @Get('/')
  async getCard() {
    return await this.cardService.getCard();
  }

  // 카드 상세 조회(댓글 포함)
  @Get('/:id')
  async detailCard(@Param('id') card_id: number) {
    return await this.cardService.detailCard(card_id);
  }

  // 카드 생성
  @Post('/:list_id')
  createCard(@Param('list_id') list_id: number, @Body() data: CreateCardDto) {
    return this.cardService.createCard(
      list_id,
      data.name,
      data.card_color,
      data.description,
      data.dueDate,
      data.status,
    );
  }

  // 카드 수정
  @Put('/:id')
  updateCard(@Param('id') card_id: number, @Body() data: UpdateCardDto) {
    return this.cardService.updateCard(
      card_id,
      data.name,
      data.card_color,
      data.description,
      data.dueDate,
      data.status,
    );
  }

  // 카드 순서 변경
  @Patch('/order/:card_id')
  updateCardOrder(
    @Param('card_id') card_id: number,
    @Body() data: UpdateCardDto,
    @Query('list_id') list_id: number,
  ) {
    return this.cardService.updateCardOrder(card_id, list_id, data.order);
  }

  //카드 리스트 변경
  @Patch('/cardWhere/:card_id')
  updateCardWhere(
    @Param('card_id') card_id: number,
    @Body() data: UpdateCardDto,
    @Query('list_id') list_id: number,
  ) {
    return this.cardService.updateCardWhere(card_id, list_id, data.order);
  }

  // 카드 삭제
  @Delete('/:card_id')
  deleteCard(@Param('id') card_id: number) {
    return this.cardService.deleteCard(card_id);
  }
}
