import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import * as cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(
      data.email,
      data.name,
      data.password,
    );
  }

  @Post('/login')
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authentication = await this.userService.login(
      data.email,
      data.password,
    );
    response.cookie('authentication', authentication);
  }

  @Put('/update')
  updateUser(@Body() data: UpdateUserDto, @Req() request: Request) {
    const auth = request.cookies;
    console.log(auth);
    return this.userService.updateUser(
      data.email,
      data.password,
      data.newPassword,
    );
  }
}
