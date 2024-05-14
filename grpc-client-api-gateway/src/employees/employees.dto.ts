import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import {
  CreateEmployee,
  SearchEmployee,
  UpdateEmployee,
} from 'clt-jwat-common';

@InputType()
export class SearchEmployeeDto implements SearchEmployee {
  @Field(() => String, { nullable: true, defaultValue: '' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  readonly name?: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  readonly email?: string;
}

@InputType()
export class CreateEmployeeDto implements CreateEmployee {
  @Field()
  @MinLength(1, { message: 'Name is not empty' })
  readonly name: string;

  @Field()
  @MinLength(1, { message: 'Email is not empty' })
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @Field({ nullable: true })
  readonly birthday?: Date;

  @Field({ nullable: true })
  readonly address?: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'Allowance must be a number' })
  readonly allowance?: number;

  @Field({ nullable: true })
  readonly phone?: string;

  @Field({ nullable: true })
  @Transform(({ value }) => value.trim())
  readonly gender?: string;
}

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
