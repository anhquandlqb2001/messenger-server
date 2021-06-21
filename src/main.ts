import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

const PORT = configService.getPort() || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT , () => console.log(`api listening on port ${PORT}`));
}

bootstrap();
