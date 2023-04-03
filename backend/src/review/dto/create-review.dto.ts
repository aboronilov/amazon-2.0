import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @Max(5)
    @Min(1)
    rating: number;

    @IsString()
    text: string;
}