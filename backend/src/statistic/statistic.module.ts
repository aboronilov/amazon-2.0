import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, UserService, PrismaService]
})
export class StatisticModule { }
