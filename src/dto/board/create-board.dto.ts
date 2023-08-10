import { IsNumber, IsString, Length } from 'class-validator';
import { BoardColor } from 'src/entity/board.entity';

export class CreateBoardDto {
  @IsString()
  @Length(5, 15)
  readonly name: string;

  @IsString()
  readonly color: BoardColor;

  @IsString()
  readonly description: string;
}
