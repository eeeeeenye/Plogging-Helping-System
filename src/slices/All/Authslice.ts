import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  clientID: number;
  email: string;
  clientName: string;
  phone: string;
  address: string;
  status: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { authorize, logout } = authSlice.actions;
export default authSlice.reducer;

