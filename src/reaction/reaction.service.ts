import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reaction } from "./entities/reaction.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "../movie/entities/movie.entity";

@Injectable()
export class ReactionService {
	constructor(
		@InjectRepository( Reaction ) private readonly reactionRepository: Repository<Reaction>,
		@InjectRepository( Movie ) private readonly movieRepository: Repository<Movie>
	) {
	}
	
	async create( createReactionDto: CreateReactionDto ): Promise<Reaction> {
		const movie = await this.movieRepository.findOne( {
			where: {
				id: createReactionDto.movieId,
				isDeleted: false
			}
		} );
		
		if( !movie ) {
			throw new NotFoundException( `Movie ${ createReactionDto.movieId } don't exists!!!` )
		}
		
		const reaction = {
			...createReactionDto,
			movie: movie
		};
		delete reaction.movieId;
		
		return await this.reactionRepository.save( reaction );
	}
	
	async findAll(): Promise<Reaction[]> {
		return await this.reactionRepository.find( { where: { isDeleted: false }, relations: [ 'movie' ] } );
	}
	
	async findOne( id: string ): Promise<Reaction> {
		return await this.reactionRepository.findOne( { where: { id: id, isDeleted: false }, relations: [ 'movie' ] } );
	}
	
	async update( id: string, updateReactionDto: UpdateReactionDto ): Promise<Reaction> {
		const movie = await this.movieRepository.findOne( { where: { id: updateReactionDto.movieId } } );
		
		const reaction = await this.reactionRepository.preload( {
			id: id,
			...updateReactionDto,
			movie: movie
		} );
		
		if( !reaction ) {
			throw new NotFoundException( `Reaction ${ id } don't exists!!!` )
		}
		
		return await this.reactionRepository.save( reaction );
	}
	
	async remove( id: string ): Promise<Reaction> {
		const reaction = await this.reactionRepository.preload( {
			id: id,
			isDeleted: true
		} );
		
		if( !reaction ) {
			throw new NotFoundException( `Reaction ${ id } don't exists!!!` )
		}
		
		return await this.reactionRepository.save( reaction );
	}
}
