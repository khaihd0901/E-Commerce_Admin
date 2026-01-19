import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'

export const getCategories = createAsyncThunk('category', async(thunkAPI) =>{
    try{
        return await categoryService.getCategories();
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getCategories.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getCategories.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.categories=action.payload;
        })
        .addCase(getCategories.rejected, (state) =>{
            state.isLoading=false;
            state.isError=true;
            state.categories=null
        })
    }
})

export default categoriesSlice.reducer