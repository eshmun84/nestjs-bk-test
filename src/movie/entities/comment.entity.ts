import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Movie } from "./movie.entity";

/*
 * Comment Entity
 * */
@Entity( { name: 'comment' } )
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn( 'uuid' )
	id: string;
	
	@Column( { name: 'isDeleted', type: 'boolean', nullable: false, default: false } )
	isDeleted: boolean;
	
	@CreateDateColumn( { name: 'createdAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	createdAt: Date;
	
	@UpdateDateColumn( { name: 'updatedAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	updatedAt: Date;
	
	@Column( { name: 'comment', type: 'text', nullable: false } )
	comment: string;
	
	@Column( { name: 'username', type: 'varchar', nullable: false } )
	username: string;
	
	@Column( { name: 'description', type: 'text', nullable: true } )
	description?: string;
	
	@ManyToOne( () => Movie, ( movie ) => movie.id )
	@JoinColumn( { name: 'movieId' } )
	movie: Movie;
}
