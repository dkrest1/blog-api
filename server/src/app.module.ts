import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { dbConfig, jwtConfig } from './config';
import { User } from './modules/user/entities/user.entity';
import { Post } from './modules/post/entities/post.entity';
import { Category } from './modules/category/entities/category.entity';
import { Comment } from './modules/comment/entities/comment.entity';
import { CommentModule } from './modules/comment/comment.module';
import { CategoryModule } from './modules/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OtpModule } from './modules/otp/otp.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { memoryStorage } from 'multer';
import { Otp } from './modules/otp/entities/otp.entity';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('MAIL_USERNAME'),
            pass: config.get<string>('MAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      exclude: ['/auth/reset/password'],
    }),
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
          entities: [User, Post, Comment, Category, Otp],
          synchronize: true,
          logging: false,
        };
      },
    }),
    UserModule,
    SearchModule,
    AuthModule,
    PostModule,
    CommentModule,
    CategoryModule,
    UploadsModule,
    OtpModule,
  ],
})
export class AppModule {}
