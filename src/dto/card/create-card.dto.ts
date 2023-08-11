import {
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { StateEnum } from '../../entity/card.entity';
import { Type } from 'class-transformer';

export class CreateCardDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly card_color: string;

  @IsString()
  readonly description: string;

  @IsDateString()
  @IsOptional()
  readonly dueDate: string | null;

  @IsEnum(StateEnum)
  @IsOptional()
  readonly status: StateEnum | null;
  role: StateEnum;
}
