import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FILMS_PACKAGE_NAME } from 'clt-jwat-common';
import { ExceptionFilter } from './middlewares/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: FILMS_PACKAGE_NAME,
        protoPath: 'node_modules/clt-jwat-common/common/protos/film.proto',
        url: 'localhost:4002',
      },
    },
  );

  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}

bootstrap();
