import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { productFullReturnObject, productReturnObject } from './utils';
import { ProductDto, GetAllProducts } from './dto';
import { Prisma } from '@prisma/client';
import { EnumProductSort } from './dto/get-all.product.dto';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService
    ) { }

    async getProductById(id: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            select: productFullReturnObject
        })

        if (!product) {
            throw new NotFoundException("Category not found")
        }

        return product
    }

    async getProductBySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: productFullReturnObject
        })

        if (!product) {
            throw new NotFoundException("Product not found")
        }

        return product
    }

    async getProductByCategorySlug(categorySlug: string) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: productFullReturnObject
        })

        if (!products) {
            throw new NotFoundException("Products not found")
        }

        return products
    }

    async getSimilarProductsById(id: string) {
        const currentProduct = await this.getProductById(id)
        if (!currentProduct) {
            throw new NotFoundException("Category not found")
        }

        const similarProducts = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: currentProduct.category.slug
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            select: productReturnObject
        })
        if (!similarProducts) {
            throw new NotFoundException("Products not found")
        }

        return similarProducts
    }

    async getAllProducts(dto: GetAllProducts = {}) {
        const { sort, searchTerm } = dto

        const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

        if (sort === EnumProductSort.LOW_PRICE) {
            prismaSort.push({ price: "asc" })
        }
        else if (sort === EnumProductSort.HIGH_PRICE) {
            prismaSort.push({ price: "desc" })
        }
        else if (sort === EnumProductSort.OLDEST) {
            prismaSort.push({ createdAt: "asc" })
        }
        else {
            prismaSort.push({ createdAt: "desc" })
        }

        const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
            OR: [
                {
                    category: {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive"
                        }
                    },
                },
                {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive"
                    },
                },
                {
                    about: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        } : {}

        const { perPage, skip } = this.paginationService.getPagination(dto)

        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: productReturnObject
        })

        return {
            products,
            length: await this.prisma.product.count({
                where: prismaSearchTermFilter
            })
        }
    }

    async updateProduct(id: string, dto: ProductDto) {
        const { images, about, name, slug, price, categoryId } = dto;
        return await this.prisma.product.update({
            where: {
                id
            },
            data: {
                images,
                about,
                name,
                slug,
                price,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })
    }

    async deleteProduct(id: string) {
        return await this.prisma.product.delete({
            where: {
                id
            }
        })
    }
}
