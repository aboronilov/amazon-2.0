import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
   IAddToCartPayload,
   ICartInitialState,
   IChangeQuantitytPayload
} from "./cart.types"

const initialState: ICartInitialState = {
   items: []
}

export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
         const productExists = state.items.find(item => item.id === action.payload.product.id)
         if (productExists) {
            state.items.push({
               ...action.payload,
               id: String(state.items.length)
            })
         }
      },
      removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
         state.items = state.items.filter(item => item.id !== action.payload.id)
      },
      changeQuantity: (state, action: PayloadAction<IChangeQuantitytPayload>) => {
         const { id, type } = action.payload
         const item = state.items.find(item => item.id === id)
         if (item) {
            type === "plus" ? item.quantity++ : item.quantity--
         }
      },
      reset: state => {
         state.items = []
      }
   }
})