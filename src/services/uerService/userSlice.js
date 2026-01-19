import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from './userService'

export const getUsers = createAsyncThunk('user', async(token, thunkAPI)=>{
    try{
        return await userService.getUsers(token)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getUsers.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUsers.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload
        })
        .addCase(getUsers.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false 
            state.users = null
        })
    }
})

export default userSlice.reducer;