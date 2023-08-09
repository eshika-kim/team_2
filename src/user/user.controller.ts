import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(
      data.eamil,
      data.name,
      data.password
    );
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    return await this.userService.login(data.eamil, data.password);
  }

  //   @Put('/update')
  //   updateUser(@Body() data: UpdateUserDto) {
  //     return this.userService.updateUser(
  //       data.name,
  //       data.password,
  //       data.newPassword
  //     );
  //   }
}
