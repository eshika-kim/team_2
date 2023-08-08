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

  @Get('')
  async getCard() {
    return await this.cardService.getCard();
  }

  @Post('')
  createCard(@Body() data: CreateCardDto) {
    return this.cardService.createCard(
      data.name,
      data.color,
      data.description,
      data.dueDate,
      data.status
    );
  }

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

  @Delete('/:id')
  deleteCard(@Param('id') card_id: number, @Body() data: DeleteCardDto) {
    return this.cardService.deleteCard(card_id);
  }
}
