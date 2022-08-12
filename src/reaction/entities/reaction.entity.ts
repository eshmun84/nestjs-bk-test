import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Movie } from "../../movie/entities/movie.entity";

/*
 * Reaction Types
 * */
export enum ReactionType {
	Like = 'like',
	Love = 'love',
	Care = 'care',
	Haha = 'haha',
	Wow = 'wow',
	Sad = 'sad',
	Angry = 'angry'
}

/*
 * ReactionsEntity
 * */
@Entity( { name: 'reaction' } )
export class Reaction extends BaseEntity {
	@PrimaryGeneratedColumn( 'uuid' )
	id: string;
	
	@Column( { name: 'isDeleted', type: 'boolean', nullable: false, default: false } )
	isDeleted: boolean;
	
	@CreateDateColumn( { name: 'createdAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	createdAt: Date;
	
	@UpdateDateColumn( { name: 'updatedAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	updatedAt: Date;
	
	@Column( { name: 'type', type: "enum", enum: ReactionType, nullable: false} )
	type: ReactionType;
	
	@ManyToOne(()=>Movie, (movie) => movie.id)
	@JoinColumn( { name: 'movieId' } )
	movie: Movie;
}
