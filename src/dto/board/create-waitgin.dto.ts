import { IsEmail } from 'class-validator';

export class CreateWaitingDto {
  @IsEmail()
  readonly email: string;
}
