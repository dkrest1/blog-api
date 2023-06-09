import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/utils.';
import { Role } from '../common/enum/role.enum';
import { UpdateUserSensitive } from './dto/update-user-sensitive.dto';

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
    if (!user || user === null) {
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

  async updateUserSensitive(
    userId: string,
    updateUserSensitive: UpdateUserSensitive,
  ): Promise<UpdateUserSensitive> {
    const user = await this.findById(userId);
    if (!user || user === null) {
      throw new NotFoundException();
    }

    if (user) {
      if (updateUserSensitive.active) {
        user.active = updateUserSensitive.active;
      }
      if (updateUserSensitive.authToken) {
        user.authToken = updateUserSensitive.authToken;
      }
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserSensitive,
    });
    return updatedUser;
  }

  async updateUserRole(email: string, role: Role): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user || user === null) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    if (user.active === false) {
      throw new HttpException('user is not active', HttpStatus.BAD_REQUEST);
    }

    const userToUpdate = {
      ...user,
      role,
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

  async findUsers(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }

  async remove(id: string): Promise<string> {
    const user = await this.findById(id);

    if (!user || user === null) {
      throw new NotFoundException();
    }
    await this.userRepository.delete(id);

    return `We are sorry to let you go ${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`;
  }
}
