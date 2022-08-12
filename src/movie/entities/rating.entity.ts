import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/*
 * Rating Entity
 * */
@Entity( { name: 'rating' } )
export class Rating extends BaseEntity {
	@PrimaryGeneratedColumn( 'uuid' )
	id: string;
	
	@Column( { name: 'isDeleted', type: 'boolean', nullable: false, default: false } )
	isDeleted: boolean;
	
	@CreateDateColumn( { name: 'createdAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	createdAt: Date;
	
	@UpdateDateColumn( { name: 'updatedAt', type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP' } )
	updatedAt: Date;
	
	@Column( { name: 'average', type: 'numeric', precision: 5, scale: 2, nullable: false } )
	average: number;
	
}
