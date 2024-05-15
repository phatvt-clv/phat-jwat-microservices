import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, MinLength } from 'class-validator';
import { CreateEmployee } from 'clt-jwat-common';

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
