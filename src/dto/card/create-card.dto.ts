import {
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { StateEnum } from '../../entity/card.entity';

export class CreateCardDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly order: number;

  @IsDate()
  @IsOptional()
  readonly dueDate: Date | null;

  @IsEnum(StateEnum)
  @IsOptional()
  readonly status: StateEnum | null;
  role: StateEnum;
}
