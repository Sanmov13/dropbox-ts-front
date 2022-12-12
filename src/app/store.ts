import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categoriesSlice";
import newsSlice from "../features/newsSlice";
import commentSlice from "../features/commentSlice";
import applicationSlice from "../features/applicationSlice";

const store = configureStore({
  reducer: {
    newsSlice,
    categoriesSlice,
    commentSlice,
    applicationSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
