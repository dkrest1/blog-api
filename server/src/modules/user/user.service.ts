import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/utils.';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // hashed password before save up
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = { ...createUserDto, password: hashedPassword };
    const createdUser = await this.userRepository.save(
      this.userRepository.create(user),
    );
    delete createdUser.password;
    return createdUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    const hashedPassword = await hashPassword(updateUserDto.password);
    const userToUpdate = {
      ...user,
      ...updateUserDto,
      password: hashedPassword,
    };

    const updatedUser = await this.userRepository.save(userToUpdate);
    delete updatedUser.password;
    return updatedUser;
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  async remove(id: string): Promise<string> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.delete(id);

    return `We are sorry to let you go ${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`;
  }
}
