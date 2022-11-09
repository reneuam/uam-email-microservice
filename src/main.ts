import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      url: [process.env.AMQP_URL],
      queue: RabbitMQ.EmailQueue
    },
  });
  await app.listen();
}
bootstrap();
