import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
    id : Number;
    username : string;
    displayName : String;
}

interface AuthState {
    user: user | null;
}

const initialState: AuthState = {
    user : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorize(state, action: PayloadAction<User>){
            state.user = action.payload;
        },
        logout(state){
            state.user = null;
        },
    },
});

export default authSlice.reducer;
export const {authorize, logout} = authSlice.actions;