import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {RatingEntity} from "../ratings/entities/rating.entity";

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          name: "moviesDB",
          entities: [MovieEntity],
          database: 'db/movies.db',
          // readonly: true,
          synchronize: false,
          logging: false
        }),

        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          name: "ratingsDB",
          entities: [RatingEntity],
          database: 'db/ratings.db',
          // readonly: true,
          synchronize: false,
          logging: false
        }),

        TypeOrmModule.forFeature([MovieEntity], "moviesDB"),
        TypeOrmModule.forFeature([RatingEntity], "ratingsDB")
      ],
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
