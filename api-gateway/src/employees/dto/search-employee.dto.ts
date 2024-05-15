import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SearchEmployee } from 'clt-jwat-common';

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
