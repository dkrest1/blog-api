import { Injectable, NotFoundException, Res } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as sharp from 'sharp';
import slugify from 'slugify';
import { Response } from 'express';

@Injectable()
export class ImageUploadService {
  private readonly publicDir: string = 'public';

  constructor() {
    fsExtra.ensureDirSync(this.publicDir);
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const uploadPath = path.join(this.publicDir, folder);
    fsExtra.ensureDirSync(uploadPath);
    const optimizedImagePath = path.join(
      uploadPath,
      slugify(file.originalname),
    );
    await sharp(file.buffer).resize(800, 800).toFile(optimizedImagePath);
    return `${uploadPath}/${slugify(file.originalname)}`;
  }

  async getImage(
    imagePath: string,
    @Res() response: Response,
  ): Promise<Buffer | any> {
    const resolvedImagePath = path.join(
      this.publicDir,
      imagePath?.substr(1) || imagePath,
    );
    const exists = await fs.promises
      .access(resolvedImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      throw new NotFoundException('Image not found');
    }
    const imageStream = fs.createReadStream(resolvedImagePath);
    response.setHeader('Content-Type', 'image/png');
    imageStream.pipe(response);
  }

  async updateImage(
    imagePath: string,
    file: Express.Multer.File,
    folder: string,
  ): Promise<any> {
    return;
  }

  async deleteImage(imagePath: string): Promise<any> {
    const resolvedImagePath = path.join(this.publicDir, imagePath?.substr(1));
    const exists = await fs.promises
      .access(resolvedImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      throw new NotFoundException('Image not found');
    }
    await fs.promises.unlink(resolvedImagePath);
  }
}
