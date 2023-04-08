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
   slug: true,
   category: {
      select: returnCategoryObject
   },
   reviews: {
      select: returnReviewObject
   },
}

export const productFullReturnObject: Prisma.ProductSelect = {
   ...productReturnObject
}