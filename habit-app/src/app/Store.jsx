import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../modules/usersSlice";

const store = configureStore({
  reducer: {
    usersRepository: usersReducer,
  },
});

export default store;