import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const httpsOptions = {
	key: fs.readFileSync('./security/cert.key'),
	cert: fs.readFileSync('./security/cert.pem')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
