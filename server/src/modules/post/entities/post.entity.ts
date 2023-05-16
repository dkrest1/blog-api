import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  img?: Buffer;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column('int', { default: 0 })
  likeCount: number;

  @ManyToMany(() => User, (user) => user.likedPosts)
  likes: User[];

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];

  @ManyToMany(() => Category, (categories) => categories.posts)
  categories: Category[];

  @Column({
    type: Date,
    nullable: true,
  })
  publish_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated: Date;
}
