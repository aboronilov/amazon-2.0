import { Icategory } from './category.interface'
import { IReview } from "./review.interface"

export interface IProduct {
   id: string
   name: string
   slug: string
   about: string
   price: number
   images: string[]
   reviews: IReview[]
   createdAt: string
   category: Icategory
}

export interface IProductDetails {
   product: IProduct
}