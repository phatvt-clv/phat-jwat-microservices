import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EMPLOYEES_PACKAGE_NAME } from 'clt-jwat-common';

@Module({
  providers: [EmployeesResolver, EmployeesService],
  imports: [
    ClientsModule.register([
      {
        name: EMPLOYEES_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: EMPLOYEES_PACKAGE_NAME,
          protoPath:
            'node_modules/clt-jwat-common/common/protos/employee.proto',
          url: 'localhost:4001',
        },
      },
    ]),
  ],
})
export class EmployeesModule {}
