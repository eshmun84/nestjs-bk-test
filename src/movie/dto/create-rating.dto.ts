import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

/*
 * Create Rating DTO
 * */
export class CreateRatingDto {
	@IsBoolean()
	@IsOptional()
	isDeleted: boolean;
	
	@IsNumber()
	@IsNotEmpty()
	average: number;
}
