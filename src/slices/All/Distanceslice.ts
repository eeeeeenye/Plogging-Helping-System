import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Distance{
    distance: number
}

const initialState: Distance= {
    distance: 0,
  };


const distSlice = createSlice({
    name: 'dist',
    initialState,
    reducers: {
        distCal(state, action:PayloadAction<number>){
            state.distance = action.payload;
        }
    }
})

export const {distCal} = distSlice.actions;
export default distSlice.reducer;