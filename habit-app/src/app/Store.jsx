import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/userSlice'
import adminReducer from '../reducers/adminSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,   
    admin: adminReducer
  }
});

export default store;