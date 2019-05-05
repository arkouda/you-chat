import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors";




async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.use(cors());
  const server = await app.listen(port);
  const io = require('socket.io')(server);

  io.on('connection', function (client) {
    // console.log('New Connection');

    client.on('newMessage', (data) => {
      io.sockets.emit('newMessage', { message: data.message, username: data.username });
      // console.log(data.message);
    });

    client.on('addUserOnline', (data) => {
      io.sockets.emit('addUserOnline', { newUser: data.username });
    });
  });

}
bootstrap();