import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUserDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltRounds: number;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.saltRounds = 10;
  }

  async registerUser(user: RegisterUserDto): Promise<UserEntity> {
    // user.password = await this.hashPassword(user.password);
    const createdUser = await this.userRepository.save(
      this.userRepository.create(user),
    );
    delete createdUser.password;
    return createdUser;
  }

  //Find by Email
  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  //   hash password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
