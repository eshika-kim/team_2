import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from 'src/dto/card/create-card.dto';
import { UpdateCardDto } from 'src/dto/card/update-card.dto';
import { DeleteCardDto } from 'src/dto/card/delete-card.dto';

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
  @Post('/')
  createCard(@Body() data: CreateCardDto) {
    return this.cardService.createCard(
      data.name,
      data.color,
      data.description,
      data.dueDate,
      data.status
    );
  }

  // 카드 수정
  @Put('/:id')
  updateCard(@Param('id') card_id: number, @Body() data: UpdateCardDto) {
    return this.cardService.updateCard(
      card_id,
      data.name,
      data.color,
      data.description,
      data.dueDate,
      data.status
    );
  }

  // 카드 삭제
  @Delete('/:id')
  deleteCard(@Param('id') card_id: number, @Body() data: DeleteCardDto) {
    return this.cardService.deleteCard(card_id);
  }
}
