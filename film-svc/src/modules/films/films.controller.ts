import { FilmService } from './films.service';
import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateFilmRequest,
  Film,
  FilmById,
  FilmResponse,
  FilmsServiceController,
  FilmsServiceControllerMethods,
  ListFilmResponse,
  SearchQuery,
  UpdateFilmRequest,
} from 'clt-jwat-common';

@Controller('films')
@FilmsServiceControllerMethods()
export class FilmsController implements FilmsServiceController {
  constructor(private readonly filmService: FilmService) {}

  findOne(
    request: FilmById,
  ): FilmResponse | Observable<FilmResponse> | Promise<FilmResponse> {
    return this.filmService.findById(request.id);
  }

  findAllFilms(
    request: SearchQuery,
  ):
    | ListFilmResponse
    | Observable<ListFilmResponse>
    | Promise<ListFilmResponse> {
    return this.filmService.findAll(request);
  }

  createFilm(
    request: CreateFilmRequest,
  ): FilmResponse | Observable<FilmResponse> | Promise<FilmResponse> {
    return this.filmService.create(request);
  }

  updateFilm(
    request: UpdateFilmRequest,
  ): FilmResponse | Observable<FilmResponse> | Promise<FilmResponse> {
    return this.filmService.update(request);
  }

  deleteFilm(
    request: FilmById,
  ): FilmResponse | Observable<FilmResponse> | Promise<FilmResponse> {
    return this.filmService.delete(request);
  }
}
