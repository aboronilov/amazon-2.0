import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Auth, CurrentUser } from 'src/auth/decorators';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) { }

  @Get()
  @Auth()
  async getMain(
    @CurrentUser("id") id: string
  ) {
    return await this.statisticService.getMain(id)
  }
}
