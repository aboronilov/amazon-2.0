import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors({
   allowedHeaders: ['content-type'],
   origin: 'http://localhost:3000',
   credentials: true,
  });
  app.setGlobalPrefix("api");  

  await app.listen(4200);
}
bootstrap();
