import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee as EmployeeProto } from 'clt-jwat-common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('employees')
export class Employee implements EmployeeProto {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
  employeeId: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 6 })
  gender: string;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  birthday: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  allowance: number;

  @Field({ nullable: true })
  @Column({ type: 'char', nullable: true, length: 10 })
  phone: string;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'modified_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deletedAt: Date;
}
