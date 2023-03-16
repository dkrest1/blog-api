import BaseEntity from '../entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;
}
