import { instance, instanceClassic } from "@/api/api.interceptor";
import { Icategory } from "@/types/category.interface";

const CATEGORY = "category"
const BY_SLUG = "by-slug"

export const CategoryService = {
   async getAll() {
      return await instanceClassic<Icategory[]>({
         url: `${CATEGORY}`,
         method: "GET"
      })
   },
   async getById(id: string) {
      return await instanceClassic<Icategory>({
         url: `${CATEGORY}/${id}`,
         method: "GET"
      })
   },
   async getBySlug(slug: string) {
      return await instanceClassic<Icategory>({
         url: `${CATEGORY}/${BY_SLUG}/${slug}`,
         method: "GET"
      })
   },
   async create() {
      return await instance<Icategory>({
         url: `${CATEGORY}`,
         method: "POST"
      })
   },
   async update(
      id: string,
      data: { name: string, slug: string }
   ) {
      return await instance<Icategory>({
         url: `${CATEGORY}/${id}`,
         method: "PUT",
         data
      })
   },
   async delete(id: string) {
      return await instance<Icategory>({
         url: `${CATEGORY}/${id}`,
         method: "DELETE"
      })
   },
}

