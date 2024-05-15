import { Field, InputType } from '@nestjs/graphql';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployee } from 'clt-jwat-common';
import { IsOptional, IsUUID, MinLength } from 'class-validator';

@InputType()
export class UpdateEmployeeDto
  extends CreateEmployeeDto
  implements UpdateEmployee
{
  @Field({ nullable: true })
  @IsUUID()
  employeeId: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly name: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly email: string;

  @IsOptional()
  @MinLength(1, { message: 'Birthday is not empty' })
  readonly birthday?: Date;

  @IsOptional()
  @MinLength(1, { message: 'Address is not empty' })
  readonly address?: string;

  @IsOptional()
  @MinLength(1, { message: 'Allowance is not empty' })
  readonly allowance?: number;

  @IsOptional()
  @MinLength(1, { message: 'Phone is not empty' })
  readonly phone?: string;

  @IsOptional()
  @MinLength(1, { message: 'Gender is not empty' })
  readonly gender?: string;
}
