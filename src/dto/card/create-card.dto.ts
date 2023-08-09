import { IsNumber, IsString, IsDate, IsEnum } from 'class-validator';
import { StateEnum } from '../../entity/card.entity';

export class CreateCardDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly dueDate: Date;

  @IsNumber()
  readonly order: number;

  @IsEnum(StateEnum)
  readonly status: StateEnum;
  role: StateEnum;
}
