import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieEntity} from "./movies/entities/movie.entity";
import {RatingEntity} from "./ratings/entities/rating.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigService available in all modules
      envFilePath: '.env', // Path to your .env file (optional, defaults to .env in the root directory)
      // envFilePath: `config/${process.env.NODE_ENV}.env`
    }),


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
    })
    , MoviesModule
    , RatingsModule
  ],
})
export class AppModule {}
