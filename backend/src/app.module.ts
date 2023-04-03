import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticModule } from './statistic/statistic.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true
      }),
      AuthModule,
      UserModule,
      ProductModule,
      ReviewModule,
      CategoryModule,
      OrderModule,
      StatisticModule,
      PaginationModule
   ],
   controllers: [AppController],
   providers: [PrismaService, AppService],
})
export class AppModule { }
