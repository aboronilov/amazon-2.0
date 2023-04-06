import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
   FLUSH,
   PAUSE,
   PERSIST,
   persistReducer,
   persistStore,
   PURGE,
   REGISTER,
   REHYDRATE
} from "redux-persist"
import storage from "redux-persist/lib/storage"

// import { carouselSlice } from "./carousel/carousel.slice"
// import { cartSlice } from "./cart/cart.slice"
import { userSlice } from './user/user.slice'

const persistConfig = {
   key: "amazon",
   storage,
   whitelist: ["cart"]
}

const rootReducer = combineReducers({
   // cart: cartSlice.reducer,
   // carousel: carouselSlice.reducer,
   user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware => 
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [
               FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE

            ]
         }
      })
})

export const persistor = persistStore(store)
export type TypeRootState = ReturnType<typeof rootReducer>