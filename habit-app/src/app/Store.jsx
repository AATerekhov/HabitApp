import { configureStore } from "@reduxjs/toolkit";
import apiSliceReducer from "../modules/apiButtons";

const store = configureStore({
  reducer: {
    apiSlice: apiSliceReducer
  }
});

export default store;