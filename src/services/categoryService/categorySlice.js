import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getCategories = createAsyncThunk("categories", async (thunkAPI) => {
  try {
    return await categoryService.getCategories();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const getCategoryById = createAsyncThunk(
  "category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.getCategoryById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createCategory = createAsyncThunk(
  "create-category",
  async (data, thunkAPI) => {
    try {
      return await categoryService.createCategory(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateCategory = createAsyncThunk(
  "update-category",
  async ({ id, data }, thunkAPI) => {
    try {
      return await categoryService.updateCategory(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "delete-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
const initialState = {
  categories: [],
  category: null,
  newCategory: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
      clearCategory: (state) => {
      state.category = null;
    },
    resetCategoryState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
        state.isError = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.categories = null;
      })
      .addCase(getCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
        state.isError = false;
      })
      .addCase(getCategoryById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.category = null;
      })

      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newCategory = action.payload;
        state.isError = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.newCategory = null;
      })

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.categories = null;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.category = null;
      });
  },
});
export const {
  clearCategory,
  resetCategoryState
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
