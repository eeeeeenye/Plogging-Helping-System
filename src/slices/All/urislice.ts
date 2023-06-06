import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface uri{
    uri: string;
}

const initialState: uri = {
    uri:''
}

const uriSlice = createSlice({
    name:'uriState',
    initialState,
    reducers: {
        save(state,action: PayloadAction<string>){
            state.uri = action.payload;
        }
    }
})

export const {save} = uriSlice.actions;
export default uriSlice.reducer;