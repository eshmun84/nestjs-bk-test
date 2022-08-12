import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Controller( 'reaction' )
export class ReactionController {
	constructor( private readonly reactionService: ReactionService ) {
	}
	
	@Post()
	async create( @Res() response, @Body() createReactionDto: CreateReactionDto ) {
		const reaction = await this.reactionService.create( createReactionDto );
		
		return response.status( HttpStatus.CREATED ).json( {
			'status': HttpStatus.CREATED,
			'reaction': reaction,
			'message': 'Reaction created successfully!!!',
			'error': ''
		} );
	}
	
	@Get()
	async findAll( @Res() response ) {
		const reactions = await this.reactionService.findAll();
		
		return response.status( HttpStatus.FOUND ).json( {
			'status': HttpStatus.FOUND,
			'reactions': reactions,
			'message': 'Reaction list retrieved successfully!!!',
			'error': ''
		} );
	}
	
	@Get( ':id' )
	async findOne( @Res() response, @Param( 'id' ) id: string ) {
		const reaction = await this.reactionService.findOne( id );
		
		return response.status( HttpStatus.FOUND ).json( {
			'status': HttpStatus.FOUND,
			'reaction': reaction,
			'message': 'Reaction retrieved successfully!!!',
			'error': ''
		} );
	}
	
	@Patch( ':id' )
	async update( @Res() response, @Param( 'id' ) id: string, @Body() updateReactionDto: UpdateReactionDto ) {
		const reaction = await this.reactionService.update( id, updateReactionDto );
		
		return response.status( HttpStatus.OK ).json( {
			'status': HttpStatus.OK,
			'reaction': reaction,
			'message': 'Reaction updated successfully!!!',
			'error': ''
		} );
	}
	
	@Delete( ':id' )
	async remove( @Res() response, @Param( 'id' ) id: string ) {
		const reaction = await this.reactionService.remove( id );
		
		return response.status( HttpStatus.OK ).json( {
			'status': HttpStatus.OK,
			'reaction': reaction,
			'message': 'Reaction deleted successfully!!!',
			'error': ''
		} );
	}
}
