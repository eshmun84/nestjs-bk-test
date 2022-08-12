import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

/*
 * Create Movie DTO
 * */
export class CreateMovieDto {
	@IsBoolean()
	@IsOptional()
	isDeleted: boolean;
	
	@IsString()
	@IsNotEmpty()
	name: string;
	
	@IsString()
	@IsUrl()
	@IsNotEmpty()
	image: string;
	
	@IsString()
	@IsUrl()
	@IsNotEmpty()
	url: string;
	
	@IsString()
	@IsNotEmpty()
	language: string;
	
	@IsString()
	@IsNotEmpty()
	summary: string;
	
	@IsUUID()
	@IsOptional()
	ratingId: string;
}
