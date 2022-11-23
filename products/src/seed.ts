import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seeder = appContext.get(SeederService);

  console.log('HELLO THERE');

  await seeder.seedCategories();
  await seeder.seedProductTypes();

  appContext.close();
}
bootstrap();
