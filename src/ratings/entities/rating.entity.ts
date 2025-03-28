import {Entity, Column, Index, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm"


@Entity("ratings")
export class RatingEntity {

    @PrimaryColumn({
        type: "int"
    })
    ratingId: number

    @Column({
        type: "int"
        ,nullable: false
    })
    userId: number

    @Column({
        type: "int"
        ,nullable: false
    })
    movieId: number

    @Column({
        nullable: false
    })
    rating: number

    @Column({
        type: "int"
        ,nullable: false
    })
    timestamp: number

}
