import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { dbConfig, jwtConfig } from './config';
import { User } from './modules/user/entities/user.entity';
import { Post } from './modules/post/entities/post.entity';
import { Category } from './modules/category/entities/category.entity';
import { Comment } from './modules/comment/entities/comment.entity';
import { PaginateModule } from './modules/paginate/paginate.module';
import { CommentModule } from './modules/comment/comment.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig, jwtConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.db'),
          entities: [User, Post, Comment, Category],
          synchronize: true,
          logging: false,
        };
      },
    }),
    UserModule,
    SearchModule,
    AuthModule,
    PostModule,
    PaginateModule,
    CommentModule,
    CategoryModule,
  ],
})
export class AppModule {}
