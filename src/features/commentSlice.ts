import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../pages/NewsItem/NewsItem";
import { News } from "./newsSlice";

interface Comment {
  _id: string;
  text: string;
  news: News;
  user: User;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

interface Pay {
  input: string | number;
  id: string | undefined;
  name: string | null;
}

export const fetchComments = createAsyncThunk<Comment[], void>(
  "comments/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3010/allComms");
      const comments = await res.json();
      return comments;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addComment = createAsyncThunk<Comment, Pay>(
  "comment/add",
  async ({ input, id, name }, thunkAPI: any) => {
    try {
      const res = await fetch("http://localhost:3010/addComm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
        },
        body: JSON.stringify({ text: input, news: id, user: name }),
      });
      const comment = await res.json();
      return comment;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteComm = createAsyncThunk<string, string>(
  "del/comm",
  async (Id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3010/delComm/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const del = await res.json();
      return Id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[], string>) => {
        state.comments = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteComm.fulfilled, (state, action) => {
        {
          state.comments = state.comments.filter(
            (elem) => elem._id !== action.payload
          );
          state.loading = false;
          state.error = null;
        }
      });
  },
});

export default commentSlice.reducer;
