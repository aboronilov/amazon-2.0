import {IUser} from "./user.interface"

export interface IReview {
   id: string
   user: IUser
   createdAt: string
   text: string
   rating: number
}