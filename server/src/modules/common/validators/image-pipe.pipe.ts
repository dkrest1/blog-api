import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
// was needed, just here just incase
@Injectable()
export class ImagePipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(file: Express.Multer.File): Promise<any> {
    const originalName = path.parse(file.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';

    await sharp(file.buffer)
      .resize(2000)
      .webp({ effort: 3 })
      .toFile(path.join('public', filename));

    return filename;
  }
}
