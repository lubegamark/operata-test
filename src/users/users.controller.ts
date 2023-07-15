import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(createUserDto);
    this.usersService.create(createUserDto);
  }

  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone);
  }
}
