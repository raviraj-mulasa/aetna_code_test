import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {RatingEntity} from "../ratings/entities/rating.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([MovieEntity], "moviesDB"),
      TypeOrmModule.forFeature([RatingEntity], "ratingsDB"),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})


export class MoviesModule {}
