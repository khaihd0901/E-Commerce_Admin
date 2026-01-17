import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/authService/authSlice";
import customerReducer from "../services/customerService/customerSlice";
import  productReducer from "../services/productService/productSlice";
import  brandReducer from "../services/brandService/brandSlice";

export const store = configureStore({
  reducer: { 
    auth: authReducer, 
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer
  },
});
