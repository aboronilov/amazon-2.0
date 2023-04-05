import { instance } from "@/api/api.interceptor";
import { Ireview } from "@/types/review.interface";

const REVIEWS = "reviews"
const CREATE = "create"

type ReviewDataType = {
   rating: number
   text: string
}

export const ReviewService = {
   async getAll() {
      return await instance<Ireview[]>({
         url: `${REVIEWS}`,
         method: "GET"
      })
   },
   async getById(id: string) {
      return await instance<Ireview>({
         url: `${REVIEWS}/${id}`,
         method: "GET"
      })
   },
   async create(
      productId: string,
      data: ReviewDataType
   ) {
      return await instance<Ireview>({
         url: `${REVIEWS}/${CREATE}/${productId}`,
         method: "POST",
         data
      })
   },
}

