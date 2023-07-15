import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    this.usersRepository.save(user);
  }

  findByPhone(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phoneNumber });
  }
}
