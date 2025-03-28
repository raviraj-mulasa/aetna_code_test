import {CreateMovieDto} from "./create-movie.dto";
import {PickType} from "@nestjs/swagger";

export class MoviePageItemResponseDto extends PickType(
        CreateMovieDto
        , ['imdbId', 'title', 'genres', 'releaseDate', 'budget'] as const
) { }


// * An endpoint exists that lists all movies
// * List is paginated: 50 movies per page, the page can be altered with the `page` query params
// * Columns should include: imdb id, title, genres, release date, budget
// * Budget is displayed in dollars
