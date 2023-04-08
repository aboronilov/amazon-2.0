import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
   }))

   const prismaService = app.get(PrismaService);
   await prismaService.enableShutdownHooks(app);

   const configService = app.get(ConfigService)

   app.enableCors({
      allowedHeaders: ['content-type', 'authorization'],
      origin: configService.get("TRUSTED_DOMAIN"),
      credentials: true,
   });
   app.setGlobalPrefix("api");

   await app.listen(4200);
}
bootstrap();
