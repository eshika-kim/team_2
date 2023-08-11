import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsString()
  @Length(3, 40)
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly order: number;
}
