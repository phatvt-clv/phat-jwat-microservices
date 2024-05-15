import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configInformation from './common/setting-information';
import { FilmsModule } from './modules/films/films.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configInformation],
    }),
    FilmsModule,
    TypeOrmModule.forRoot({
      type: configInformation().database.type,
      host: configInformation().database.host,
      port: configInformation().database.port,
      username: configInformation().database.username,
      password: configInformation().database.password,
      database: configInformation().database.database,
      entities: ['dist/**/**/*.entity{.ts,.js}'], //dist\src\entities\film.entity.js
      // entities: [Film],

      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
