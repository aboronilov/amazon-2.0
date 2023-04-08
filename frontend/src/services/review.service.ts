import { instance, instanceClassic } from "@/api/api.interceptor";
import { IReview } from "@/types/review.interface";

const REVIEWS = "reviews"
const CREATE = "create"

type ReviewDataType = {
   rating: number
   text: string
}

export const ReviewService = {
   async getAll() {
      return await instanceClassic<IReview[]>({
         url: `${REVIEWS}`,
         method: "GET"
      })
   },
   async getById(id: string) {
      return await instanceClassic<IReview>({
         url: `${REVIEWS}/${id}`,
         method: "GET"
      })
   },
   async create(
      productId: string,
      data: ReviewDataType
   ) {
      return await instance<IReview>({
         url: `${REVIEWS}/${CREATE}/${productId}`,
         method: "POST",
         data
      })
   },
}

