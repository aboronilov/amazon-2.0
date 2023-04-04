import { Prisma } from "@prisma/client";
import { ArrayMinSize, IsNumber, IsString } from "class-validator";

export class ProductDto implements Prisma.ProductUpdateInput {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsString()
    about: string

    @IsString({ each: true })
    @ArrayMinSize(1)
    images: string[]

    @IsString()
    categotyId: string

    @IsString()
    slug: string

    @IsString()
    categoryId: string
}