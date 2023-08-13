import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Req,
  Res,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { DeleteUserDto } from 'src/dto/user/delete-user.dto';
import * as cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
interface RequestWithLocals extends Request {
  locals: {
    user: {
      id: number;
      name: string;
    };
  };
}

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
    response.cookie('Authentication', 'Bearer ' + authentication);
  }

  @Get('/')
  async getUser(@Req() request: RequestWithLocals) {
    const userName = request.locals.user.name;
    return userName;
  }

  @Get('/logout')
  async logout(@Res() response: Response) {
    response.clearCookie('Authentication');
    response.status(200).send('Logged out successfully');
  }

  @Patch('/update')
  updateUser(@Body() data: UpdateUserDto, @Req() request: RequestWithLocals) {
    const auth = request.locals.user;
    return this.userService.updateUser(
      auth.id,
      data.password,
      data.newPassword,
    );
  }
  @Delete('/cancel')
  DeleteUser(@Body() data: DeleteUserDto, @Req() request: RequestWithLocals) {
    const auth = request.locals.user;
    return this.userService.deleteUser(
      auth.id,
      data.password,
      data.passwordConfirm,
    );
  }
}
