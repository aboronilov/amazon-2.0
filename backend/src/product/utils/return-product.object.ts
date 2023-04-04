import { Prisma } from "@prisma/client";
import { returnCategoryObject } from "src/category/utils";
import { returnReviewObject } from "src/review/utils";

export const productReturnObject: Prisma.ProductSelect = {
    id: true,
    images: true,
    about: true,
    name: true,
    price: true,
    createdAt: true,
    slug: true
}

export const productFullReturnObject: Prisma.ProductSelect = {
    ...productReturnObject,
    reviews: {
        select: returnReviewObject
    },
    category: {
        select: returnCategoryObject
    }
}