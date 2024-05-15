import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { Film } from '@entities/film.entity';
import {
  FILM_ERROR_MESSAGE,
  FILM_MESSAGE,
} from '@custom-messages/film.message';
import { RpcException } from '@nestjs/microservices';
import {
  CreateFilmRequest,
  FilmById,
  FilmResponse,
  ListFilmResponse,
  SearchQuery,
  UpdateFilmRequest,
} from 'clt-jwat-common';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  private buildResponse(
    data: Film,
    message: string,
    code: number,
  ): FilmResponse {
    if (!data) {
      return {
        message,
        code,
      };
    }
    return {
      data,
      message,
      code,
    };
  }

  async findAll(request: SearchQuery): Promise<ListFilmResponse> {
    request.key = request.key ?? '';

    const films = await this.filmRepository.find({
      where: [
        {
          status: true,
          title: ILike(`%${request.key}%`),
        },
        {
          status: true,
          director: ILike(`%${request.key}%`),
        },
      ],
      order: {
        order: 'DESC',
      },
    });

    if (!films.length) {
      return {
        data: null,
        message: FILM_ERROR_MESSAGE.NOT_FOUND_KEYWORD,
        code: HttpStatus.NOT_FOUND,
      };
    }

    return {
      data: films,
      code: HttpStatus.OK,
    };
  }

  async findById(id: string): Promise<FilmResponse> {
    if (!id) {
      throw new RpcException(FILM_ERROR_MESSAGE.NOT_FOUND_ID);
    }
    const film = await this.filmRepository.findOne({
      where: {
        filmId: id,
        status: true,
      },
    });

    if (!film) {
      return this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.NOT_FOUND_ID,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.buildResponse(film, 'Success', HttpStatus.OK);
  }

  async create(request: CreateFilmRequest): Promise<FilmResponse> {
    const film = await this.filmRepository.findOne({
      where: {
        title: request.title,
        deletedAt: IsNull(),
      },
    });

    if (film) {
      return this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.TITLE_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const createdFilm = await this.filmRepository.save(request);

      return this.buildResponse(
        createdFilm,
        FILM_MESSAGE.CREATE,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return this.buildResponse(null, error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(request: UpdateFilmRequest): Promise<FilmResponse> {
    if (!request.id) {
      return this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.NOT_FOUND_ID,
        HttpStatus.NOT_FOUND,
      );
    }

    const film: Film = await this.filmRepository.findOne({
      where: {
        filmId: request.id,
      },
    });

    if (!film) {
      return this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.NOT_FOUND_ID,
        HttpStatus.NOT_FOUND,
      );
    }

    const filmByTitle: Film = await this.filmRepository.findOne({
      where: {
        filmId: Not(request.id),
        title: request.title || '',
        deletedAt: IsNull(),
      },
    });

    if (filmByTitle) {
      return this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.TITLE_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      Object.assign(film, request);
      const updatedFilm = await this.filmRepository.save(film);
      return this.buildResponse(
        updatedFilm,
        FILM_MESSAGE.UPDATE,
        HttpStatus.OK,
      );
    } catch (error) {
      this.buildResponse(null, error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(request: FilmById): Promise<FilmResponse> {
    if (!request.id) {
      this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.NOT_FOUND_ID,
        HttpStatus.NOT_FOUND,
      );
    }

    const film = await this.filmRepository.findOne({
      where: { filmId: request.id },
    });

    if (!film) {
      return this.buildResponse(
        null,
        FILM_ERROR_MESSAGE.NOT_FOUND_ID,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.filmRepository.softDelete(request.id);
    film.deletedAt = new Date();
    return this.buildResponse(film, FILM_MESSAGE.DELETE, HttpStatus.OK);
  }
}
