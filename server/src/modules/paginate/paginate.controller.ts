import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateService } from './paginate.service';

@ApiTags('paginate')
@Controller('paginate')
export class PaginateController {
  constructor(private readonly paginateService: PaginateService) {}
}
