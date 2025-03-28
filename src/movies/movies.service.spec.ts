import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingEntity} from "../ratings/entities/rating.entity";
import {MovieEntity} from "./entities/movie.entity";

describe('MoviesService', () => {
  let service: MoviesService;

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
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
