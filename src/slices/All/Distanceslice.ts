import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Distance{
    distance: number,
    walking: number,
    trashcnt: number,
}

const initialState: Distance= {
    distance: 0,
    walking:0,
    trashcnt:0,
  };


const distSlice = createSlice({
    name: 'dist',
    initialState,
    reducers: {
        distCal(state, action:PayloadAction<number>){
            state.distance = action.payload;
        },
        walking(state,action: PayloadAction<number>){
            state.walking = action.payload;
        },
        trashCount(state, action:PayloadAction<number>){
            state.trashcnt = action.payload;
        }
    }
})

export const {distCal,walking,trashCount} = distSlice.actions;
export default distSlice.reducer;