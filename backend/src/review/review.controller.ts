import { Auth, CurrentUser } from 'src/auth/decorators';
import { ReviewService } from './review.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateReviewDto } from './dto';

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Get()
  async getAllCategories() {
    return this.reviewService.getAllReviews();
  }

  @Auth()
  @Post("create/:productId")
  async createReview(
    @CurrentUser("id") id: string,
    @Body() dto: CreateReviewDto,
    @Param('productId') productId: string,
  ) {
    return this.reviewService.createReview(id, dto, productId);
  }
}
