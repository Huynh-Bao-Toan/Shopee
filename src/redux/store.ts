import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import cartSlice from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
