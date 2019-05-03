import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors";
// const server = require('http').createServer();
// const io = require('socket.io')(server);


async function bootstrap() {

  // io.on('connection', function (client) {
  //   console.log('New Connection');
  // });
  
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.use(cors());
  await app.listen(port);

}
bootstrap();