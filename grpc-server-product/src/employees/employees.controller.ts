import { EmployeesService } from "./employees.service";
// import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';
// import { Employee as Emp } from './entities/employee.entity';
import {
  CreateEmployeeDto,
  EmployeeId,
  EmployeeServiceControllerMethods,
  ResponseEmployee,
  ResponseListEmployee,
  SearchEmployeeDto,
  UpdateEmployeeDto,
} from "src/proto/employees";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@Controller("employees")
@EmployeeServiceControllerMethods()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @GrpcMethod("EmployeeService", "updateEmployee")
  async updateEmployee(request: UpdateEmployeeDto): Promise<ResponseEmployee> {
    return await this.employeesService.updateEmployee(request);
  }

  @GrpcMethod("EmployeeService", "createEmployee")
  async createEmployee(request: CreateEmployeeDto): Promise<ResponseEmployee> {
    return await this.employeesService.createEmployee(request);
  }

  @GrpcMethod("EmployeeService", "getAllEmployees")
  async getAllEmployees(
    request: SearchEmployeeDto,
  ): Promise<ResponseListEmployee> {
    const employees = await this.employeesService.getAllEmployees(
      request.employeeId,
      request.email,
      request.name,
    );

    return employees;
  }

  @GrpcMethod("EmployeeService", "getEmployeeById")
  async getEmployeeById(request: EmployeeId): Promise<ResponseEmployee> {
    return await this.employeesService.getEmployeeById(request.employeeId);
  }

  @GrpcMethod("EmployeeService", "deleteEmployee")
  async deleteEmployee(request: EmployeeId): Promise<ResponseEmployee> {
    return await this.employeesService.deleteEmployee(request.employeeId);
  }
}
