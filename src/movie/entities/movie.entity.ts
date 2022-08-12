import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn, Unique,
	UpdateDateColumn
} from "typeorm";
import { Rating } from "./rating.entity";

/*
 * Movie Entity
 * */
@Entity( { name: 'movie' } )
@Unique( [ 'rating' ] )
export class Movie extends BaseEntity {
	@PrimaryGeneratedColumn( 'uuid' )
	id: string;
	
	@Column( { name: 'isDeleted', type: 'boolean', nullable: false, default: false } )
	isDeleted: boolean;
	
	@CreateDateColumn( { name: 'createdAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	createdAt: Date;
	
	@UpdateDateColumn( { name: 'updatedAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	updatedAt: Date;
	
	@Column( { name: 'name', type: 'varchar', nullable: false } )
	name: string;
	
	@Column( { name: 'image', type: 'text', nullable: false } )
	image: string;
	
	@Column( { name: 'url', type: 'text', nullable: false } )
	url: string;
	
	@Column( { name: 'language', type: 'varchar', nullable: false } )
	language: string;
	
	@Column( { name: 'summary', type: 'text', nullable: false } )
	summary: string;
	
	@ManyToOne( () => Rating, ( rating ) => rating.id )
	@JoinColumn( { name: 'ratingId' } )
	rating?: Rating;
}
