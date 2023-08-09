import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService = UserService) {}
  //
  @Post('sign')
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
}
