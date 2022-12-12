import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";

export interface News {
  _id: string;
  title: string;
  image: string;
  text: string;
  category: Category;
}

interface NewsState {
  news: News[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk<News[], void>(
  "news/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3010/allNews");
      const news = await res.json();
      return news;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<News[], string>) => {
          state.news = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchNews.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default newsSlice.reducer;
