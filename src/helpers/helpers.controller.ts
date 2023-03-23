import { ApiTags } from '@nestjs/swagger';
import { HelpersService } from './helpers.service';
import { Controller, Get } from '@nestjs/common';

@ApiTags('helpers')
@Controller('helpers')
export class HelpersController {
  constructor(private helpersService: HelpersService) {}

  @Get('create-base-data')
  createBaseData() {
    return this.helpersService.createBaseData();
  }
}
