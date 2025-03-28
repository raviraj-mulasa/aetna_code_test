import {Injectable} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {MovieEntity} from "./entities/movie.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RatingEntity} from "../ratings/entities/rating.entity";
import {MovieResponseDto} from "./dto/movie-response.dto";
import {plainToInstance} from "class-transformer";
import {MoviePageItemResponseDto} from "./dto/movie-page-item-response.dto";
import {
    IPaginationMeta,
    IPaginationOptions,
    paginate,
    Pagination
} from "nestjs-typeorm-paginate";
import {FilterOptions} from "../common/interfaces";

@Injectable()
export class MoviesService {

    constructor(
        @InjectRepository(MovieEntity, "moviesDB")
        private readonly moviesRepository: Repository<MovieEntity>,
        @InjectRepository(RatingEntity, "ratingsDB")
        private readonly ratingsRepository: Repository<RatingEntity>
    ) {  }

    create(createMovieDto: CreateMovieDto) {
        return 'This action adds a new movie';
    }


    async findAllPaginate(options: IPaginationOptions, filterOptions: FilterOptions): Promise<Pagination<MoviePageItemResponseDto>> {

        let queryBuilder = this.moviesRepository
            .createQueryBuilder('mov')
            .orderBy('mov.releaseDate', 'DESC')

        if(filterOptions.property.toLowerCase() === 'genre') {
            return await  this.findAllGenrePaginate(options, filterOptions.value);
        }
        else if(filterOptions.property.toLowerCase() === 'releasedate' || filterOptions.property.toLowerCase() === 'year') {
            const releaseEndDate = `${filterOptions.value}-12-31`;
            const releaseStartDate = `${filterOptions.value}-01-01`;
            console.debug(`Year: ${filterOptions.value} Release Start Date: ${releaseStartDate} Release End Date: ${releaseEndDate}`)
            queryBuilder = queryBuilder.where(
                'mov.releaseDate >= :releaseStartDate AND mov.releaseDate <= :releaseEndDate'
                , { releaseStartDate, releaseEndDate }
            );
        }
        const paginatedMovieEntities = await paginate<MovieEntity>(queryBuilder, options);
        return this.transformDto(paginatedMovieEntities);
    }


    async findOne(id: number):  Promise<MovieResponseDto> {
        const movieEntity: MovieEntity | null =  await this.moviesRepository.findOneBy({movieId: id});
        const movieResponseDto =  plainToInstance<MovieResponseDto, MovieEntity | null>(
            MovieResponseDto
            ,movieEntity
            , {
                strategy: 'excludeAll'
                , enableImplicitConversion: true
                , excludeExtraneousValues: true
            }
        );
        movieResponseDto.averageRating = await this.ratingsRepository.average("rating", {movieId: id}) ?? 0.0
        return movieResponseDto
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return `This action updates a #${id} movie`;
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }

    private async findAllGenrePaginate(options: IPaginationOptions, genre: string):  Promise<Pagination<MoviePageItemResponseDto>> {

        const genreRegEx = `%${genre}%`
        const rawMovieEntitiesCount: number = await this.moviesRepository.manager.query(
            'SELECT count(*) as totalItems FROM movies, json_each(genres) WHERE  lower(trim(json_extract(json_each.value, \'$.name\'))) LIKE ?'
            , [genreRegEx]
        );
        // console.log(rawMovieEntitiesCount);
        const skip =  (+options.limit * Math.max(+options.page-1, 0))
        const rawMovieEntities: Array<MovieEntity> = await this.moviesRepository.manager.query<Array<MovieEntity>>(
            'SELECT * FROM movies, json_each(genres) WHERE  lower(trim(json_extract(json_each.value, \'$.name\'))) LIKE ? ORDER BY releaseDate DESC  LIMIT ?, ?'
            , [genreRegEx, skip, options.limit ]
        );
        // console.log(rawMovieEntities)
        const  totalItems:number = rawMovieEntitiesCount[0].totalItems;
        const totalPages = Math.ceil(totalItems / +options.limit);
        const itemCount = (+options.limit * +options.page ) <= totalItems ?
            +options.limit :
            Math.max(totalItems - (+options.limit *(+options.page - 1)),0);
        console.debug(`Genre: ${genre} Total Items: ${totalItems} Total Pages: ${totalPages} Item Count: ${itemCount}` );
        const paginatedMovieEntities = new Pagination<MovieEntity>(
            rawMovieEntities
            , {
                totalItems:	totalItems,
                itemCount:  itemCount,
                itemsPerPage: +options.limit,
                totalPages: totalPages,
                currentPage: (+options.page)
            }
        );
        return this.transformDto(paginatedMovieEntities);
    }

    private transformDto(paginatedMovieEntities: Pagination<MovieEntity, IPaginationMeta>): Pagination<MoviePageItemResponseDto, IPaginationMeta> {
        const paginatedMovieDto =  new Pagination<MoviePageItemResponseDto>(
            new Array<MoviePageItemResponseDto>(paginatedMovieEntities.items.length),
            paginatedMovieEntities.meta,
            // paginatedMovieEntities.links,
        );
        paginatedMovieEntities.items.map((item, index: number ): void => {
            // console.log(item)
            paginatedMovieDto.items[index]=
                plainToInstance<MoviePageItemResponseDto, MovieEntity | null>(
                    MoviePageItemResponseDto
                    ,item
                    , {
                        strategy: 'excludeAll'
                        , enableImplicitConversion: true
                        , excludeExtraneousValues: true
                    }
                );
        });
        return  paginatedMovieDto;
    }
}
