import { HttpStatus, Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError(errors) {
        //handle error when graphQL validation failed
        if (errors.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
          return {
            message: errors.message,
            code: 'BAD_REQUEST',
            statusCode: HttpStatus.BAD_REQUEST,
          };
        }

        //handle error when class-validator throw error
        if (errors.extensions.originalError) {
          const errorClassValidator = errors.extensions.originalError;
          const message =
            errorClassValidator['message'].length === 1
              ? errorClassValidator['message'][0]
              : errorClassValidator['message'];
          return {
            message: message,
            error: errorClassValidator['error'],
            statusCode: errorClassValidator['statusCode'],
          };
        }

        //handle others error
        return {
          message: errors.message,
          code: 'INTERNAL_SERVER_ERROR',
          statusCode:
            errors.extensions.code || HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    }),
    EmployeesModule,
  ],
})
export class AppModule {}
