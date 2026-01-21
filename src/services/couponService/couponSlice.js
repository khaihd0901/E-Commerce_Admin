import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupons = createAsyncThunk("coupons", async (thunkAPI) => {
  try {
    return await couponService.getCoupons();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const getCouponById = createAsyncThunk(
  "coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getCouponById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createCoupon = createAsyncThunk(
  "create-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.createCoupon(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateCoupon = createAsyncThunk(
  "update-coupon",
  async ({ id, data }, thunkAPI) => {
    try {
      return await couponService.updateCoupon(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const deleteCoupon = createAsyncThunk(
  "delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
const initialState = {
  coupons: [],
  coupon: null,
  newCoupon: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const couponsSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
      clearCoupon: (state) => {
      state.coupon = null;
    },
    resetCouponState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = action.payload;
        state.isError = false;
      })
      .addCase(getCoupons.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.coupons = null;
      })
      .addCase(getCouponById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupon = action.payload;
        state.isError = false;
      })
      .addCase(getCouponById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.coupon = null;
      })

      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newCoupon = action.payload;
        state.isError = false;
      })
      .addCase(createCoupon.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.newCoupon = null;
      })

      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupon = action.payload;
      })
      .addCase(updateCoupon.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupon = null;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(deleteCoupon.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.product = null;
      });
  },
});
export const {
  clearCoupon,
  resetCouponState
} = couponsSlice.actions;

export default couponsSlice.reducer;
