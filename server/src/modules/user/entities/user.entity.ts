import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    select: false,
  })
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
