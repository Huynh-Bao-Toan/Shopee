import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { handleGetAccessToken } from '~/utils/auth'

// Define a type for the slice state
interface authState {
  isAuthenticated: boolean
}

// Define the initial state using that type
const initialState: authState = {
  isAuthenticated: Boolean(handleGetAccessToken())
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    }
  }
})

export const { setIsAuthenticated } = authSlice.actions
export default authSlice.reducer
