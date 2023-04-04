import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetAllProducts } from './dto';
import { Auth } from 'src/auth/decorators';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }

  @Get()
  async getAllProducts(
    @Query() queryDto: GetAllProducts
  ) {
    return this.productService.getAllProducts(queryDto)
  }

  @Get('similar/:id')
  async getSimilarProducts(
    @Param() id: string
  ) {
    return this.productService.getSimilarProductsById(id)
  }

  @Get('by-slug/:slug')
  async getProductBySlug(
    @Param() slug: string
  ) {
    return this.productService.getProductBySlug(slug)
  }

  @Get('by-category/:categorySlug')
  async getProtuctsByCategorySlug(
    @Param() categorySlug: string
  ) {
    return this.productService.getProductByCategorySlug(categorySlug)
  }

  @Get(':id')
  @Auth()
  async getProductId(
    @Param() id: string
  ) {
    return this.productService.getProductById(id)
  }
}
