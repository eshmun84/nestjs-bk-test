import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reaction } from "./entities/reaction.entity";
import { Movie } from "../movie/entities/movie.entity";

@Module( {
	imports: [ TypeOrmModule.forFeature( [ Reaction, Movie ] ) ],
	controllers: [ ReactionController ],
	providers: [ ReactionService ]
} )
export class ReactionModule {
}
