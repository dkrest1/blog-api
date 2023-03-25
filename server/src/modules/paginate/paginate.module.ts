import { Module } from '@nestjs/common';
import { PaginateService } from './paginate.service';
import { PaginateController } from './paginate.controller';

@Module({
  controllers: [PaginateController],
  providers: [PaginateService]
})
export class PaginateModule {}
