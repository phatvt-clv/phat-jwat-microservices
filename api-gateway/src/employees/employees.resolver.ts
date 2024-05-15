/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { Employee } from './employees.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { SearchEmployeeDto } from './dto/search-employee.dto';

@Resolver((of) => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation((returns) => Employee)
  createEmployee(
    @Args('CreateEmployee') createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Query((returns) => [Employee])
  getAllEmployees(
    @Args('query', { nullable: true })
    SearchEmployeeDto?: SearchEmployeeDto,
  ): Promise<Employee[]> {
    return this.employeesService.getAllEmployees(SearchEmployeeDto);
  }

  @Query((returns) => Employee, { name: 'GetEmployeeById' })
  async getEmployeeById(
    @Args('id', ParseUUIDPipe) id: string,
  ): Promise<Employee> {
    return await this.employeesService.getEmployeeById(id);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('updateEmployee') updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.updateEmployee(updateEmployeeDto);
  }

  @Mutation(() => Employee)
  deleteEmployee(@Args('id', ParseUUIDPipe) id: string) {
    return this.employeesService.deleteEmployee(id);
  }
}
