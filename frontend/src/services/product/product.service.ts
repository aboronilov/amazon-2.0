import { instanceClassic } from '@/api/api.interceptor';
import { EnumProductSort, TypeDataFilters } from './product.types';
import { IProduct, TypePaginationProducts } from '@/types/product.interface';

const PRODUCTS = "products"
const SIMILAR = "similar"
const BY_SLUG = "by-slug"
const BY_CATEGORY = "by-category"

export const ProductService = {
   async getAll(queryData = {} as TypeDataFilters){
      const {data} = await instanceClassic<TypePaginationProducts>({
         url: `${PRODUCTS}`,
         method: "GET",
         params: queryData
      })

      return data
   },
   async getSimilarProducts(productId: string){
      return await instanceClassic<IProduct[]>({
         url: `${PRODUCTS}/${SIMILAR}/${productId}`,
         method: "GET",
      })
   },
   async getBySlug(slug: string){
      return await instanceClassic<IProduct>({
         url: `${PRODUCTS}/${BY_SLUG}/${slug}`,
         method: "GET",
      })
   },
   async getByCategory(categorySlug: string){
      return await instanceClassic<IProduct[]>({
         url: `${PRODUCTS}/${BY_CATEGORY}/${categorySlug}`,
         method: "GET",
      })
   },
   async getById(id: string){
      return await instanceClassic<IProduct>({
         url: `${PRODUCTS}//${id}`,
         method: "GET",
      })
   },   
}

