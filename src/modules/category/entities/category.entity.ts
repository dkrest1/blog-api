import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from 'src/modules/post/entities/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  category: string;
  @ManyToMany(() => Post, (posts) => posts.categories)
  posts: Post[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
