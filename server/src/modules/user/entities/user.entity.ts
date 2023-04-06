import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { UserRole } from 'src/modules/enum/role.enum';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Post } from 'src/modules/post/entities/post.entity';

import * as bcrypt from 'bcrypt';

@Entity()
export class User {
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
  @Column({ type: 'enum', enum: UserRole, default: UserRole.SUBSCRIBER })
  role: UserRole;
  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];
  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  // hash password before save to the database
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  // compare the password
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
