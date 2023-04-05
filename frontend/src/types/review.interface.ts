import {IUser} from "./user.interface"

export interface Ireview {
   id: string
   user: IUser
   createdAt: string
   text: string
   rating: string
}