import { ICartItem } from "@/types/cart.interface";

export interface ICartInitialState {
   items: ICartItem[]
}

export interface IAddToCartPayload extends Omit<ICartItem, "id"> {}

export interface IChangeQuantitytPayload extends Pick<ICartItem, "id"> {
   type: "minus" | "plus"
}
