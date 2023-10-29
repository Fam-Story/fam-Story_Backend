import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.saveUser(createUserDto);
  }

  @Put('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get('/all')
  async findAll() {
    const userList = await this.userService.findAll();
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: 'success',
    });
  }
}
