import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  _id: string,
  title: string
}

interface CategoryState {
  categories: Category[],
  loading: boolean,
  error: string | null
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void>(
  "category/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3010/allCategories");
      const categories = await res.json();
      return categories;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[], string>) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export default categoriesSlice.reducer;
