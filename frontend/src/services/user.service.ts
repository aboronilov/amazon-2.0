import { instance, instanceClassic } from "@/api/api.interceptor";
import { IFullUser, IUser } from '@/types/user.interface';

const USERS = "users"
const PROFILE = "profile"
const FAVORITES = "favorites"

type UpdateTypeData = {
   name: string
   email?: string
   password?: string
   avatarPath?: string
   phone?: string
}

export const UserService = {
   async getProfile() {
      return await instance<IFullUser>({
         url: `${USERS}/${PROFILE}/`,
         method: "GET"
      })
   },
   async updateProfile(data: UpdateTypeData) {
      return await instance<IUser>({
         url: `${USERS}/${PROFILE}`,
         method: "PUT",
         data
      })
   },
   async toggleFavorite(productId: string) {
      return await instance<IUser>({
         url: `${USERS}/${PROFILE}/${FAVORITES}/${productId}`,
         method: "PATCH",
         
      })
   },
}

