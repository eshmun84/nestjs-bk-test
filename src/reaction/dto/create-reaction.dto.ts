import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ReactionType } from "../entities/reaction.entity"

/*
 * Create Reaction DTO
 * */
export class CreateReactionDto {
	@IsBoolean()
	@IsOptional()
	isDeleted: boolean;
	
	@IsEnum(ReactionType)
	@IsNotEmpty()
	type: ReactionType;
	
	@IsUUID()
	@IsNotEmpty()
	movieId: string;
}
