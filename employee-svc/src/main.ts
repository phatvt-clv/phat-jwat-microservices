import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { EMPLOYEES_PACKAGE_NAME } from "clt-jwat-common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: EMPLOYEES_PACKAGE_NAME,
        protoPath: "node_modules/clt-jwat-common/common/protos/employee.proto",
        url: "localhost:4001",
      },
    },
  );

  await app.listen();
}
bootstrap();
