import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface List {
  signingIn: boolean,
  signingUp: boolean,
  error: string | null,
  token: string | null,
  login1: string | null
}

const initialState: List = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: localStorage.getItem("token"),
  login1: localStorage.getItem("name"),
};

interface Pay {
  login: string,
  password: string
}

interface Pal {
  token: string,
  login1: string
}

export const authSignUp = createAsyncThunk<Pay, Pay>(
  "auth/signUp",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3010/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();

      return json;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSignIn = createAsyncThunk<Pal, Pay>(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3010/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();

      localStorage.setItem("token", token.token);
      localStorage.setItem("name", token.login1);

      return token;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const applicationSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
      })
      .addCase(authSignIn.pending, (state) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.error = null;
        state.token = action.payload.token;
        state.login1 = action.payload.login1;
      });
  },
});

export default applicationSlice.reducer;
