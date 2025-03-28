import { Test, TestingModule } from '@nestjs/testing';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingEntity} from "./entities/rating.entity";

describe('RatingsController', () => {
  let controller: RatingsController;

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
      controllers: [RatingsController],
      providers: [RatingsService],
    }).compile();

    controller = module.get<RatingsController>(RatingsController);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
