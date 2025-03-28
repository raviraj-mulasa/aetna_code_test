import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './ratings.service';
import {RatingEntity} from "./entities/rating.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

describe('RatingsService', () => {
  let service: RatingsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          name: "ratingsDB",
          entities: [RatingEntity],
          database: 'db/ratings.db',
          // readonly: true,
          synchronize: false,
          logging: false
        }),
        TypeOrmModule.forFeature([RatingEntity], "ratingsDB")
      ],
      providers: [
          RatingsService
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    // mockedRepository = module.get(getRepositoryToken(RatingEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
