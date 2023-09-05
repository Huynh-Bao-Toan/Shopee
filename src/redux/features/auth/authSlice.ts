import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '~/types/user.type'
import { handleGetAccessToken, handleGetUserProfile } from '~/utils/auth'

// Define a type for the slice state
interface authState {
  isAuthenticated: boolean
  userInfo: User | null
}

// Define the initial state using that type
const initialState: authState = {
  isAuthenticated: Boolean(handleGetAccessToken()),
  userInfo: handleGetUserProfile()
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setUserInfo: (state, action: PayloadAction<User | null>) => {
      state.userInfo = action.payload
    }
  }
})

export const { setIsAuthenticated, setUserInfo } = authSlice.actions
export default authSlice.reducer
