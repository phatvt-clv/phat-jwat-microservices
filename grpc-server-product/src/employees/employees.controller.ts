import { EmployeesService } from "./employees.service";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  CreateEmployee,
  EmployeeId,
  EmployeeServiceControllerMethods,
  ResponseEmployee,
  ResponseListEmployee,
  SearchEmployee,
  UpdateEmployee,
} from "clt-jwat-common";

@Controller("employees")
@EmployeeServiceControllerMethods()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @GrpcMethod("EmployeeService", "updateEmployee")
  async updateEmployee(request: UpdateEmployee): Promise<ResponseEmployee> {
    return await this.employeesService.updateEmployee(request);
  }

  @GrpcMethod("EmployeeService", "createEmployee")
  async createEmployee(request: CreateEmployee): Promise<ResponseEmployee> {
    return await this.employeesService.createEmployee(request);
  }

  @GrpcMethod("EmployeeService", "getAllEmployees")
  async getAllEmployees(
    request: SearchEmployee,
  ): Promise<ResponseListEmployee> {
    const employees = await this.employeesService.getAllEmployees(
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
