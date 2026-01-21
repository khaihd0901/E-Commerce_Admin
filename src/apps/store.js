import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/authService/authSlice";
import userReducer from "../services/uerService/userSlice";
import  productReducer from "../services/productService/productSlice";
import  brandReducer from "../services/brandService/brandSlice";
import categoryReducer from "../services/categoryService/categorySlice"
import couponReducer from '../services/couponService/couponSlice';
import orderReducer from '../services/OrderService/orderSlice'

export const store = configureStore({
  reducer: { 
    user: userReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    coupon: couponReducer,
    order: orderReducer,
    auth: authReducer, 
  },
});
