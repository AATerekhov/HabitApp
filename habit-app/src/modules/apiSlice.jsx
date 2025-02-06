//apiButtons.jsx v1.1

import { createSlice , createAsyncThunk  } from "@reduxjs/toolkit"
//import axios from './axiosConfigRoomBuilder';
import axios from './axiosConfigISBuilder';

export const postData = createAsyncThunk('apiSlice/postData', async (data) => {
  const response = await axios.post('/Protected/methodRequiringAuthorization', data);
  return response.data; // Возвращаем данные ответа
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Сохраняем данные в состоянии
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Сохраняем ошибку
      });
  },
});

export default apiSlice.reducer;
