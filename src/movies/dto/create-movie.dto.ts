import {
    IsArray,
    IsDate,
    IsEnum,
    IsInt,
    IsJSON,
    IsNotEmpty,
    IsNumber,
    Length,
    Min,
    ValidateNested
} from "class-validator";
import {ProductionCompany} from "../entities/production-compnay";
import {Genre} from "../entities/genre";
import {MovieStatus} from "../entities/movie-status";
import {Expose, Transform, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMovieDto {

    @ApiProperty()
    @Expose()
    @IsInt()
    movieId: number

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @Length(9, 9)
    imdbId: string

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    overview: string


    @Type(() => ProductionCompany)
    @Expose()
    @ApiProperty()
    productionCompanies: ProductionCompany[]


    @ApiProperty()
    @Expose()
    @IsDate()
    releaseDate: string

    @ApiProperty()
    @Expose()
    @Min(1)
    @IsNumber()
    @Transform(({ value }) => `$${value}`)
    budget: number

    @ApiProperty()
    @Expose()
    @Min(1)
    @IsNumber()
    revenue: number

    @ApiProperty()
    @Expose()
    @IsNumber({maxDecimalPlaces: 2})
    runtime: number

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    language: string


    @ApiProperty()
    @Expose()
    // @IsJSON()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => Genre)
    // genres: Genre[]
    genres: string

    @ApiProperty()
    @Expose()
    @IsEnum(MovieStatus)
    status: MovieStatus

}
