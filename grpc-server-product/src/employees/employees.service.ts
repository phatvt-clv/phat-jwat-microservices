import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Employee } from "./employee.entity";
import { validate as isValidUUID } from "uuid";
import {
  EMPLOYEE_ERROR_MESSAGE,
  EMPLOYEE_MESSAGE,
} from "src/common/employees.message";
import {
  CreateEmployee,
  ResponseEmployee,
  ResponseListEmployee,
  UpdateEmployee,
} from "clt-jwat-common";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  private buildResponse(
    code: number,
    message?: string,
    data?: Employee,
  ): ResponseEmployee {
    return { code, data, message };
  }

  private buildResponseList(
    code: number,
    message?: string,
    data?: Employee[],
  ): ResponseListEmployee {
    return { code, message, data };
  }

  async createEmployee(
    createEmployeeDto: CreateEmployee,
  ): Promise<ResponseEmployee> {
    const checkEmployee = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email },
    });
    if (checkEmployee) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        EMPLOYEE_ERROR_MESSAGE.REPEATED_EMAIL,
        null,
      );
    }
    const newEmployee = await this.employeeRepository.save(createEmployeeDto);
    return this.buildResponse(
      HttpStatus.OK,
      EMPLOYEE_MESSAGE.CREATED,
      newEmployee,
    );
  }

  async getAllEmployees(
    email?: string,
    name?: string,
  ): Promise<ResponseListEmployee> {
    const conditions: { email?: any; name?: any } = {};

    if (email) conditions.email = ILike(`%${email}%`);
    if (name) conditions.name = ILike(`%${name}%`);

    const employees = await this.employeeRepository.find({ where: conditions });

    if (employees.length === 0)
      return this.buildResponseList(
        HttpStatus.BAD_REQUEST,
        EMPLOYEE_ERROR_MESSAGE.NOT_FOUND,
        null,
      );

    return this.buildResponseList(200, "Success", employees);
  }

  async getEmployeeById(employeeId: string): Promise<ResponseEmployee> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId },
    });

    if (!employee)
      return this.buildResponse(
        HttpStatus.NOT_FOUND,
        EMPLOYEE_ERROR_MESSAGE.NOT_FOUND,
        null,
      );

    return this.buildResponse(200, "Success", employee);
  }

  async updateEmployee(request: UpdateEmployee): Promise<ResponseEmployee> {
    if (!isValidUUID(request.employeeId))
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        EMPLOYEE_ERROR_MESSAGE.NOT_ID(request.employeeId),
        null,
      );

    const employee = await this.employeeRepository.findOne({
      where: { employeeId: request.employeeId },
    });

    console.log(employee);

    if (!employee)
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        EMPLOYEE_ERROR_MESSAGE.NOT_ID(request.employeeId),
        null,
      );

    if (request.email) {
      const employeeWithRepeatEmail = await this.employeeRepository.findOne({
        where: { email: request.email },
      });
      if (employeeWithRepeatEmail)
        return this.buildResponse(
          HttpStatus.BAD_REQUEST,
          EMPLOYEE_ERROR_MESSAGE.REPEATED_EMAIL,
          null,
        );
    }

    Object.assign(employee, request);
    const updatedEmployee = await this.employeeRepository.save(employee);
    return this.buildResponse(200, EMPLOYEE_MESSAGE.UPDATED, updatedEmployee);
  }

  async deleteEmployee(employeeId: string): Promise<ResponseEmployee> {
    if (!isValidUUID(employeeId))
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        EMPLOYEE_ERROR_MESSAGE.NOT_ID(employeeId),
        null,
      );

    const employee = await this.employeeRepository.findOne({
      where: { employeeId: employeeId },
    });

    if (!employee) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        EMPLOYEE_ERROR_MESSAGE.NOT_ID(employeeId),
        null,
      );
    }

    await this.employeeRepository.softDelete(employeeId);
    employee.deletedAt = new Date();
    return this.buildResponse(200, EMPLOYEE_MESSAGE.DELETED, employee);
  }
}
