import { Controller } from '@nestjs/common';
import { PaginateService } from './paginate.service';

@Controller('paginate')
export class PaginateController {
  constructor(private readonly paginateService: PaginateService) {}
}
