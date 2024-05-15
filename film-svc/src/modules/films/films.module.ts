import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '@entities/film.entity';
import { FilmService } from './films.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [FilmService],
})
export class FilmsModule {}
