import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const privateKey = fs.readFileSync('nolshimung-key.pem', 'utf8');
  const certificate = fs.readFileSync('nolshimung.pem', 'utf8');
  const httpsOptions = {key: privateKey, cert: certificate};

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.enableCors({
    credentials: true,
    // origin: "https://8466-143-248-219-17.jp.ngrok.io",
    origin: 'https://localhost:3000' || true,
  });
  app.use(cookieParser());
  await app.init();

  // http.createServer(server).listen(3010);
  https.createServer(httpsOptions, server).listen(8443);


  // const app = await NestFactory.create(AppModule);
  
  // await app.listen(8443);
}
bootstrap();
