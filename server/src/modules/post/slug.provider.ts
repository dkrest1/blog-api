import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';

@Injectable()
export class SlugProvider {
  constructor(private readonly configService: ConfigService) {}
  async slugify(slug: string): Promise<string> {
    return slugify(slug, {
      replacement: this.configService.get<string>('process.env.REPLACEMENT'),
      lower: true,
    });
  }
}
