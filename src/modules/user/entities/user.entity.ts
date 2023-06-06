import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from 'src/modules/common/enum/role.enum';
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

  @Column({ type: 'enum', enum: Role, default: Role.SUBSCRIBER })
  role: Role;

  @Column({ type: 'bytea', nullable: true })
  profilePicture: Buffer;

  @ManyToMany(() => Post, (post) => post.likes)
  @JoinTable()
  likedPosts: Post[];

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];

  @Column({ type: 'bool', default: false })
  active: boolean;

  @Column({ nullable: true })
  authToken: string;

  @Column({ nullable: true })
  otp: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
