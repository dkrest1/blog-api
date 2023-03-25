import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  content: string;

  @Column({ default: false })
  published: boolean;

  @Column({
    type: Date,
    nullable: true,
  })
  publish_at: Date | null;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
