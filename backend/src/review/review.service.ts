import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnReviewObject } from './utils';
import { CreateReviewDto } from './dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) { }

    async getAllReviews() {
        return await this.prisma.review.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: returnReviewObject
        })
    }

    async createReview(userId: string, dto: CreateReviewDto, productId: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product) {
            throw new NotFoundException()
        }
        if (product.userId !== userId) {
            throw new UnauthorizedException("You can only make reviews ufter purchasing of this item")
        }

        return await this.prisma.review.create({
            data: {
                rating: dto.rating,
                text: dto.text,
                product: {
                    connect: {
                        id: productId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async getAverageValueByProductId(productId: string) {
        return await this.prisma.review
            .aggregate({
                where: {
                    productId
                },
                _avg: {
                    rating: true
                }
            })
            .then(data => data._avg)
    }

}

