import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from './orderService'

export const getUserOrders = createAsyncThunk('user-orders', async (thunkAPI) =>{
    try{
        return await orderService.getUserOrders()
    }catch(err){
        thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    orders: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const ordersSlice = createSlice({
    name: 'user-orders',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getUserOrders.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUserOrders.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        })
        .addCase(getUserOrders.rejected, (state) =>{
            state.isLoading = false
            state.isError = true;
            state.orders = null
        })
    }
})

export default ordersSlice.reducer