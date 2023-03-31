import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true
      }),
      AuthModule
   ],
   controllers: [AppController],
   providers: [PrismaService, AppService],
})
export class AppModule { }
