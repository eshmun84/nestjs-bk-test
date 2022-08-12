import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Rating } from "./entities/rating.entity";
import { Comment } from "./entities/comment.entity";

@Module({
  imports: [ TypeOrmModule.forFeature( [ Movie, Comment, Rating ] ) ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
