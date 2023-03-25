import { IsNotEmpty, IsString, IsDate } from 'class-validator';
export class CreatePostDto {
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsDate()
  publish_date: Date;
}
