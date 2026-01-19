import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import couponService from './couponService';

export const getCoupons = createAsyncThunk('coupons', async(thunkAPI)=>{
    
    try{
        return await couponService.getCoupons()
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    coupons: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const couponsSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getCoupons.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getCoupons.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.coupons = action.payload;
            state.isError = false;
        })
        .addCase(getCoupons.rejected, (state) =>{
            state.isLoading=false;
            state.isError = true;
            state.coupons = null
        })
    }
})

export default couponsSlice.reducer