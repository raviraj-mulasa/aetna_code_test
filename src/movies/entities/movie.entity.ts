import {Entity, Column, Index, PrimaryColumn} from "typeorm"
import {MovieStatus} from "./movie-status";
import {IsDate, Length, Min} from "class-validator";
import {Genre} from "./genre";

@Entity("movies")
export class MovieEntity {

    @PrimaryColumn({
        type: "int",
        unsigned: true
    })
    movieId: number

    @Column({
        type: "text",
        length: 9
        , nullable: false
    })
    @Length(9)
    @Index()
    imdbId: string

    @Column({
        type: "text",
        nullable: false
    })
    title: string

    @Column({type: "text", nullable: true})
    overview: string

    // @Column({type: "json", nullable: true})
    // productionCompanies: ProductionCompany[]

    @Column({type: "text", nullable: true})
    productionCompanies: string

    @Column({type: "date", nullable: true})
    @IsDate()
    @Index()
    releaseDate: Date

    @Column({type: "bigint", nullable: true})
    @Min(1)
    budget: number

    @Column({type: "bigint", nullable: true})
    @Min(1)
    revenue: number

    @Column({type: "real", nullable:true})
    runtime: number

    @Column({type: "text", nullable: true})
    language: string

    // @Column({type: "json", nullable:true})
    // genres: Genre[]

    @Column({type: "text", nullable:true})
    genres: string

    @Column({
        type: "simple-enum",
        nullable: true,
        enum: MovieStatus,
        default: MovieStatus.UNKNOWN,
    })
    status: MovieStatus
}
