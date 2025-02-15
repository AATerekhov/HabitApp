import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    apiSlice: apiSliceReducer,    
  }
});

export default store;