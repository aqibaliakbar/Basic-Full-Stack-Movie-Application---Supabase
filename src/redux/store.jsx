import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movieSlice.jsx";
import userReducer from "./features/userSlice.jsx";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,

  },
});

export default store;
