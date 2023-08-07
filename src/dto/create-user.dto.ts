import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  NotEquals,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(3, 6)
  readonly name: string;

  @IsString()
  @Length(6, 12)
  readonly password: string;

  @IsString()
  @Length(6, 12)
  readonly confirmPassword: string;
}
