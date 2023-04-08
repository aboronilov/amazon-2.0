import Cookies from "js-cookie"
import { IAuthResponse, IEmailPassword } from "@/store/user/user.interface";
import { saveToStorage } from "./auth.helper";
import { instanceClassic } from "@/api/api.interceptor";

const AUTH = "auth"
const REFRESH_ENDPOINT = "login/access-token"

export const AuthService = {
   async main(
      type: "login" | "register", 
      data: IEmailPassword
   ) {
      const response = await instanceClassic<IAuthResponse>({
         url: `${AUTH}/${type}`,
         method: "POST",
         data
      })

      if (response.data.accessToken) {
         saveToStorage(response.data)
      }

      return response.data
   },

   async getNewTokens() {
      const refreshToken = Cookies.get("refreshToken")

      const response = await instanceClassic.post<string, {data: IAuthResponse}>(
         `${AUTH}/${REFRESH_ENDPOINT}`,
         {refreshToken},
      )

      if (response.data.accessToken) {
         saveToStorage(response.data)
      }

      return response
   }
}

