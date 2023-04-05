import Cookies from "js-cookie"
import axios from 'axios';
import { IAuthResponse, IEmailPassword } from "@/store/user/user.interface";
import { getContentType } from "@/api/api.helper";
import { saveToStorage } from "./auth.helper";
import { instance } from "@/api/api.interceptor";

const AUTH = "auth"
const REFRESH_ENDPOINT = "login/access-token"

export const AuthService = {
   async main(
      type: "login" | "register", 
      data: IEmailPassword
   ) {
      const response = await instance<IAuthResponse>({
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

      const response = await axios.post<string, {data: IAuthResponse}>(
         `${process.env.SERVER_URL}/${AUTH}/${REFRESH_ENDPOINT}`,
         {refreshToken},
         {
            headers: getContentType()
         }
      )

      if (response.data.accessToken) {
         saveToStorage(response.data)
      }

      return response
   }
}

