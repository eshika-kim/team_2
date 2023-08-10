import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { StateEnum } from '../../entity/card.entity';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsString()
  @IsOptional()
  readonly name: string | null;

  @IsString()
  @IsOptional()
  readonly color: string | null;

  @IsString()
  @IsOptional()
  readonly description: string | null;

  @IsDate()
  @IsOptional()
  readonly dueDate: Date | null;

  @IsNumber()
  @IsOptional()
  readonly order: number | null;

  @IsEnum(StateEnum)
  @IsOptional()
  readonly status: StateEnum | null;
  role: StateEnum;
}
