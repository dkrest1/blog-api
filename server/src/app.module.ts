import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { dbConfig, jwtConfig } from './config';
import { Users } from './modules/user/entities/user.entity';
import { Posts } from './modules/post/entities/post.entity';
import { PaginateModule } from './modules/paginate/paginate.module';
import { CommentModule } from './modules/comment/comment.module';
import { CategoriesModule } from './modules/categories/categories.module';

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
          entities: [Users, Posts],
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
    CategoriesModule,
  ],
})
export class AppModule {}
