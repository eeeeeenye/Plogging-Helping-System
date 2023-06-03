import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface Distance{
    distance: Float
}

interface DistanceState{
    dist: Distance | null;
}

const initialState: DistanceState = {
    dist: null,
  };


const distSlice = createSlice({
    name: 'dist',
    initialState,
    reducers: {
        distCal(state, action:PayloadAction<Distance>){
            state.dist = action.payload;
        }
    }
})

export const {distCal} = distSlice.actions;
export default distSlice.reducer;