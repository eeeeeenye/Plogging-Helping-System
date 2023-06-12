import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Distance{
    distance: number,
    walking: number,
    trashcnt_percent: number,
    trashcnt:number,
    cnnResult: string,
}

const initialState: Distance= {
    distance: 0,
    walking:0,
    trashcnt_percent:0,
    trashcnt:0,
    cnnResult:'',
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
            state.trashcnt_percent = action.payload;
        },
        trashCount2(state, action:PayloadAction<number>){
            state.trashcnt = action.payload;
        },
        cnnResults(state, action:PayloadAction<string>){
            state.cnnResult = action.payload;
        }
    }
})

export const {distCal,walking,trashCount,trashCount2} = distSlice.actions;
export default distSlice.reducer;