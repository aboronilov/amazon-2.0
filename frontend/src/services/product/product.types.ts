export type TypeData = {
   name: string,
   price: number,
   about: string,
   images: string[],
   categoryId: string
}

export type TypeDataFilters = {
   sort?: EnumProductSort
   searchTerm?: string
   page?: string | number
   perPage?: string | number
}

export enum EnumProductSort {
   HIGH_PRICE = "high-price",
   LOW_PRICE = "low-price",
   NEWEST = "newest",
   OLDEST = "oldest"
}
