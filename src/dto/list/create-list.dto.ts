import { IsNumber, IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @Length(10, 40)
  readonly name: string;

  @IsNumber()
  readonly order: number;
}
