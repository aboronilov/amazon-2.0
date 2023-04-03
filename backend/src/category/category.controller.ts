import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators';
import { UpdateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(":id")
  @Auth()
  async getCategoryById(
    @Param("id") id: string,
  ) {
    return this.categoryService.getCategoryById(id);
  }

  @Get("/by-slug/:slug")
  async getCategoryBySlug(
    @Param("slug") slug: string,
  ) {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Put(":id")
  @Auth()
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param("id") id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Post()
  @Auth()
  async createCategory() {
    return this.categoryService.createCategory();
  }

  @Delete(":id")
  @Auth()
  @HttpCode(HttpStatus.OK)
  async deleteCategory(
    @Param("id") id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.deleteCategory(id);
  }
}
