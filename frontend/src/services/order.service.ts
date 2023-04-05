import { instance } from "@/api/api.interceptor"
import { IOrder } from "@/types/order.interface"

const ORDERS = "orders"

export const OrdersService = {
   async getAll() {
      return await instance<IOrder[]>({
         url: `${ORDERS}`,
         method: "GET"
      })
   },
   async getById(id: string) {
      return await instance<IOrder>({
         url: `${ORDERS}/${id}`,
         method: "GET"
      })
   },
}

