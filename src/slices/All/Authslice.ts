import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  clientID: number
  email: string
  ClientName: string
  phone: string
  address: string
  status: string
}

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    addAdress(state, action: PayloadAction<Object>) {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { authorize, logout, addAdress } = authSlice.actions
export default authSlice.reducer
