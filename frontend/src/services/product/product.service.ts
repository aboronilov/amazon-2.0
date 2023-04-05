import { instance } from '@/api/api.interceptor';
import { TypeData, TypeDataFilters } from './product.types';
import { IProduct } from '@/types/product.interface';

const PRODUCTS = "products"
const SIMILAR = "similar"
const BY_SLUG = "by-slug"
const BY_CATEGORY = "by-category"

export const ProductService = {
   async getAll(queryData = {} as TypeDataFilters){
      return await instance<IProduct[]>({
         url: `${PRODUCTS}`,
         method: "GET",
         params: queryData
      })
   },
   async getSimilarProducts(productId: string){
      return await instance<IProduct[]>({
         url: `${PRODUCTS}/${SIMILAR}/${productId}`,
         method: "GET",
      })
   },
   async getBySlug(slug: string){
      return await instance<IProduct>({
         url: `${PRODUCTS}/${BY_SLUG}/${slug}`,
         method: "GET",
      })
   },
   async getByCategory(categorySlug: string){
      return await instance<IProduct[]>({
         url: `${PRODUCTS}/${BY_CATEGORY}/${categorySlug}`,
         method: "GET",
      })
   },
   async getById(id: string){
      return await instance<IProduct>({
         url: `${PRODUCTS}//${id}`,
         method: "GET",
      })
   },   
}

