import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../services/uerService/userSlice";
import  brandReducer from "../services/brandService/brandSlice";
import categoryReducer from "../services/categoryService/categorySlice"
import couponReducer from '../services/couponService/couponSlice';
import orderReducer from '../services/OrderService/orderSlice'

export const store = configureStore({
  reducer: { 
    user: userReducer,
    brand: brandReducer,
    category: categoryReducer,
    coupon: couponReducer,
    order: orderReducer,
  },
});
