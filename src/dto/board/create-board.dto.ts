import { IsNumber, IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @Length(5, 15)
  readonly name: string;

  @IsString()
  readonly color: string;

  @IsNumber()
  readonly description: string;
}
