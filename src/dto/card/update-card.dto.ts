import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsNumber()
  @IsOptional()
  readonly order: number;
}
