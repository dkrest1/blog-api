import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
