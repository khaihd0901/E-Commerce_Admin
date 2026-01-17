import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'


export const getProducts = createAsyncThunk('products', async(thunkAPI)=>{
    try{
        return await productService.getProducts()
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getProducts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true,
            state.products = action.payload
        })
        .addCase(getProducts.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.products = null
        })
    }
})

export default productSlice.reducer