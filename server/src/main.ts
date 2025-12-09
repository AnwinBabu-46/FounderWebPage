import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Handle paths for both dev (ts-node) and prod (dist)
  const viewsPath = join(__dirname, '..', 'views');
  console.log('Resolved Views Path:', viewsPath); // Debug log
  
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
