import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  EMPLOYEES_PACKAGE_NAME,
  EMPLOYEE_SERVICE_NAME,
  EmployeeServiceClient,
} from 'clt-jwat-common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { SearchEmployeeDto } from './dto/search-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService implements OnModuleInit {
  private employeeService: EmployeeServiceClient;

  constructor(@Inject(EMPLOYEES_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.employeeService = this.client.getService<EmployeeServiceClient>(
      EMPLOYEE_SERVICE_NAME,
    );
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const result = await lastValueFrom(
      this.employeeService.createEmployee(createEmployeeDto),
    );
    return result.data;
  }

  async getAllEmployees(searchEmployeeDto: SearchEmployeeDto) {
    if (!searchEmployeeDto) searchEmployeeDto = { email: null, name: null };
    console.log(searchEmployeeDto);
    const result = await lastValueFrom(
      this.employeeService.getAllEmployees(searchEmployeeDto),
    );
    if (!result.data) throw new BadRequestException(result.message);
    return result.data;
  }

  async getEmployeeById(id: string) {
    const result = await lastValueFrom(
      this.employeeService.getEmployeeById({ employeeId: id }),
    );
    if (!result.data) throw new NotFoundException(result.message);
    return result.data;
  }

  async updateEmployee(updateEmployeeDto: UpdateEmployeeDto) {
    if (!updateEmployeeDto || updateEmployeeDto.employeeId === '')
      throw new BadRequestException('Employee ID is not empty');

    const result = await lastValueFrom(
      this.employeeService.updateEmployee(updateEmployeeDto),
    );
    if (!result.data) throw new NotFoundException(result.message);
    return result.data;
  }

  async deleteEmployee(id: string) {
    const result = await lastValueFrom(
      this.employeeService.deleteEmployee({ employeeId: id }),
    );
    if (!result.data) throw new NotFoundException(result.message);
    return result.data;
  }
}
