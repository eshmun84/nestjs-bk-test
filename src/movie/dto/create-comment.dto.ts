import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

/*
 * Create Comment DTO
 * */
export class CreateCommentDto {
	@IsBoolean()
	@IsOptional()
	isDeleted: boolean;
	
	@IsString()
	@IsNotEmpty()
	comment: string;
	
	@IsString()
	@IsNotEmpty()
	username: string;
	
	@IsString()
	@IsNotEmpty()
	description: string;
	
	@IsUUID()
	@IsNotEmpty()
	movieId: string;
}
