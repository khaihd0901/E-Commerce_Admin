import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import brandService from './brandService'


export const getBrands = createAsyncThunk('brand', async(thunkAPI)=>{
    try{
        return await brandService.getBrands()
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    brands: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const brandsSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getBrands.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getBrands.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true,
            state.brands = action.payload
        })
        .addCase(getBrands.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.brands = null
        })
    }
})

export default brandsSlice.reducer