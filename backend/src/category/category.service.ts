import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnCategoryObject } from './utils';
import { UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async getCategoryById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id
            },
            select: returnCategoryObject
        })

        if (!category) {
            throw new NotFoundException("Category not found")
        }

        return category
    }

    async getCategoryBySlug(slug: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug
            },
            select: returnCategoryObject
        })

        if (!category) {
            throw new NotFoundException("Category not found")
        }

        return category
    }

    async getAllCategories() {
        return await this.prisma.category.findMany({
            select: returnCategoryObject
        })
    }

    async createCategory() {
        return this.prisma.category.create({
            data: {
                name: "",
                slug: ""
            }
        })
    }

    async updateCategory(id: string, dto: UpdateCategoryDto) {
        return await this.prisma.category.update({
            where: {
                id
            },
            data: {
                name: dto.name,
                slug: dto.slug
            }
        })
    }

    async deleteCategory(id: string) {
        return await this.prisma.category.delete({
            where: {
                id
            }
        })
    }

}
