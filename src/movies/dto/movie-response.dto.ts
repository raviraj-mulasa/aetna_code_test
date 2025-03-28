import 'reflect-metadata';
import {OmitType, PartialType} from "@nestjs/mapped-types";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, Min} from "class-validator";
import {Expose} from "class-transformer";
import {CreateMovieDto} from "./create-movie.dto";

export class MovieResponseDto extends OmitType(
    CreateMovieDto
    , ['movieId', 'revenue', 'status'] as const
) {
    @ApiProperty()
    @Expose()
    @IsNumber()
    @Min(0)
    averageRating: number = 0.0
}

// * An endpoint exists that lists the movie details for a particular movie
// * Details should include: imdb id, title, description, release date, budget, runtime, average rating, genres, original language, production companies
// * Budget should be displayed in dollars
// * Ratings are pulled from the rating database
