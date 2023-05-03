import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from 'src/modules/common/enum/role.enum';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Post } from 'src/modules/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
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
}
