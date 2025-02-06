import { configureStore } from "@reduxjs/toolkit";
import apiSliceReducer from "../modules/apiSlice";
import authReducer from "../modules/authSlice";

const store = configureStore({
  reducer: {
    apiSlice: apiSliceReducer,    
    auth: authReducer
  }
});

export default store;