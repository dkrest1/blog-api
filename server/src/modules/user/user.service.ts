import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );

    delete user.password;
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findById(id: number): Promise<Users | null> {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
