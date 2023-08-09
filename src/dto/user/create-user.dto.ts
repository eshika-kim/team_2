import {
  Matches,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly eamil: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/)
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/)
  readonly passwordConfirm: string;

  @IsString()
  readonly name: string;
}
