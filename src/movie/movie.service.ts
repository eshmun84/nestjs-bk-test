import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { Rating } from "./entities/rating.entity";
import { isUndefined } from "@nestjs/common/utils/shared.utils";
import { CreateRatingDto } from "./dto/create-rating.dto";

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository( Movie ) private readonly movieRepository: Repository<Movie>,
		@InjectRepository( Rating ) private readonly ratingRepository: Repository<Rating>,
	) {
	}
	
	async create( createMovieDto: CreateMovieDto ): Promise<Movie> {
		let rating: Rating = null;
		if( !isUndefined( createMovieDto.ratingId ) ) {
			rating = await this.ratingRepository.findOne( {
				where: {
					id: createMovieDto.ratingId,
					isDeleted: false
				}
			} );
		}
		
		const movie = await this.movieRepository.findOne( {
			where: { name: createMovieDto.name, isDeleted: false }
		} );
		
		if( movie ) {
			throw new NotAcceptableException( `${ createMovieDto.name } already exists!!!` );
		}
		
		delete createMovieDto.ratingId;
		
		return await this.movieRepository.save( { ...createMovieDto, rating: rating } );
	}
	
	async findAll(): Promise<Movie[]> {
		return await this.movieRepository.find( { where: { isDeleted: false }, relations: [ 'rating' ] } );
	}
	
	async findOne( id: string ): Promise<Movie> {
		return await this.movieRepository.findOne( { where: { id: id, isDeleted: false }, relations: [ 'rating' ] } );
	}
	
	async update( id: string, updateMovieDto: UpdateMovieDto ): Promise<Movie> {
		let rating: Rating = null;
		if( !isUndefined( updateMovieDto.ratingId ) ) {
			rating = await this.ratingRepository.findOne( { where: { id: updateMovieDto.ratingId } } );
		}
		
		const movie = await this.movieRepository.preload( {
			id: id,
			...updateMovieDto,
			rating: rating
		} );
		
		if( !movie ) {
			throw new NotFoundException( `Movie ${ id } don't exists!!!` )
		}
		
		return await this.movieRepository.save( movie );
	}
	
	async remove( id: string ): Promise<Movie> {
		const movie = await this.movieRepository.preload( {
			id: id,
			isDeleted: true
		} );
		
		if( !movie ) {
			throw new NotFoundException( `Movie ${ id } don't exists!!!` )
		}
		
		return await this.movieRepository.save( movie );
	}
	
	
	
	async createRating( createRatingDto: CreateRatingDto ): Promise<Rating> {
		return await this.ratingRepository.save( { ...createRatingDto } );
	}
}
