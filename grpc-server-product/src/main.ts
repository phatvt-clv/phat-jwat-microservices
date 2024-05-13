import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { EMPLOYEES_PACKAGE_NAME } from "./proto/employees";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: EMPLOYEES_PACKAGE_NAME,
        protoPath: join(__dirname, "../proto/employees.proto"),
        url: "localhost:4001",
      },
    },
  );

  await app.listen();
}
bootstrap();
