import { IsNumber, IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsString()
  @Length(10, 40)
  readonly name: string;

  @IsNumber()
  readonly order: number;
}
