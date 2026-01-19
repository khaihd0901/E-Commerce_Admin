import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'


export const getProducts = createAsyncThunk('products', async(thunkAPI)=>{
    try{
        return await productService.getProducts()
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})


export const createProduct = createAsyncThunk('add-product', async(data,thunkAPI)=>{
    try{
        return await productService.createProduct(data)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const uploadProductImage = createAsyncThunk('upload-image', async(images,thunkAPI)=>{
    try{
        return await productService.uploadProductImage(images)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateProduct = createAsyncThunk('update-product', async(data,thunkAPI)=>{
    try{
        return await productService.updateProduct(data)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getProductById = createAsyncThunk('get-product', async(id,thunkAPI)=>{
    try{
        return await productService.getProductById(id)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    product:[] ,
    products: [],
    images:[],
    newProduct:[],
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
        .addCase(createProduct.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true,
            state.newProduct = action.payload
        })
        .addCase(createProduct.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.products = null
        })               
        .addCase(uploadProductImage.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(uploadProductImage.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true,
            state.images = action.payload
        })
        .addCase(uploadProductImage.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.images = null
        })
        .addCase(updateProduct.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true,
            state.products = action.payload
        })
        .addCase(updateProduct.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.products = null
        })
        .addCase(getProductById.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getProductById.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true,
            state.product = action.payload
        })
        .addCase(getProductById.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.product = null
        })
    }
})

export default productSlice.reducer