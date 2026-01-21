import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk("brands", async (thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const getBrandById = createAsyncThunk(
  "brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getBrandById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createBrand = createAsyncThunk(
  "create-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.createBrand(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateBrand = createAsyncThunk(
  "update-brand",
  async ({ id, data }, thunkAPI) => {
    try {
      return await brandService.updateBrand(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const deleteBrand = createAsyncThunk(
  "delete-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
const initialState = {
  brands: [],
  brand: null,
  newBrand: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const brandsSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
      clearBrand: (state) => {
      state.brand = null;
    },
    resetBrandState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
        state.isError = false;
      })
      .addCase(getBrands.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.brands = null;
      })
      .addCase(getBrandById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brand = action.payload;
        state.isError = false;
      })
      .addCase(getBrandById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.brand = null;
      })

      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newBrand = action.payload;
        state.isError = false;
      })
      .addCase(createBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.newBrand = null;
      })

      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brand = action.payload;
      })
      .addCase(updateBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brand = null;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brand = action.payload;
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brand = null;
      });
  },
});
export const {
  clearBrand,
  resetBrandState
} = brandsSlice.actions;

export default brandsSlice.reducer;
