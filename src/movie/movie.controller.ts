import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateRatingDto } from "./dto/create-rating.dto";

@Controller( 'movie' )
export class MovieController {
	constructor( private readonly movieService: MovieService ) {
	}
	
	@Post()
	async create( @Res() response, @Body() createMovieDto: CreateMovieDto ) {
		const movie = await this.movieService.create( createMovieDto );
		
		return response.status( HttpStatus.CREATED ).json( {
			'status': HttpStatus.CREATED,
			'movie': movie,
			'message': 'Movie created successfully!!!',
			'error': ''
		} );
	}
	
	@Get()
	async findAll( @Res() response ) {
		const movies = await this.movieService.findAll();
		
		return response.status( HttpStatus.FOUND ).json( {
			'status': HttpStatus.FOUND,
			'movies': movies,
			'message': 'Movie list retrieved successfully!!!',
			'error': ''
		} );
	}
	
	@Get( ':id' )
	async findOne( @Res() response, @Param( 'id' ) id: string ) {
		const movie = await this.movieService.findOne( id );
		
		return response.status( HttpStatus.FOUND ).json( {
			'status': HttpStatus.FOUND,
			'movie': movie,
			'message': 'Movie retrieved successfully!!!',
			'error': ''
		} );
	}
	
	@Patch( ':id' )
	async update( @Res() response, @Param( 'id' ) id: string, @Body() updateMovieDto: UpdateMovieDto ) {
		const movie = await this.movieService.update( id, updateMovieDto );
		
		return response.status( HttpStatus.OK ).json( {
			'status': HttpStatus.OK,
			'movie': movie,
			'message': 'Movie updated successfully!!!',
			'error': ''
		} );
	}
	
	@Delete( ':id' )
	async remove( @Res() response, @Param( 'id' ) id: string ) {
		const movie = await this.movieService.remove( id );
		
		return response.status( HttpStatus.OK ).json( {
			'status': HttpStatus.OK,
			'movie': movie,
			'message': 'Movie deleted successfully!!!',
			'error': ''
		} );
	}
	
	
	
	@Post('create-rating')
	async createRating( @Res() response, @Body() createRatingDto: CreateRatingDto ) {
		const rating = await this.movieService.createRating( createRatingDto );
		
		return response.status( HttpStatus.CREATED ).json( {
			'status': HttpStatus.CREATED,
			'movie': rating,
			'message': 'Rating created successfully!!!',
			'error': ''
		} );
	}
}
