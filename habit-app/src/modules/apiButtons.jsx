import { createSlice , createAsyncThunk  } from "@reduxjs/toolkit"
import axios from './axiosConfigRoomBuilder';


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

//const CALL_METHOD = 'CALL_METHOD';

//const apiReducer = (state = [], action) => {
//  return state;
//};

//export default apiReducer;


// export const sendRequestOnMethod = () => {
  //console.log(`[${UserService.getUsername()}] calls for api method`);
  //return {
  //  type: CALL_METHOD,
  //  payload: {
  //    request: {
  //      url: `/Protected/method`,
  //      method: 'POST',
  //    },
  //  },
  //}
// };
// 
// export const sendRequestOnMethodWithAuthorization = () => {
  // console.log(`[${UserService.getUsername()}] calls for api method`);
  // return {
    // type: CALL_METHOD,
    // payload: {
      // request: {
        // url: `/Protected/methodRequiringAuthorization`,
        // method: 'POST',
      // },
    // },
  // }
// };
// 
// export const sendRequestOnMethodGetUserDetail = () => {
  // console.log(`[${UserService.getUsername()}] calls for api method`);
  // return {
    // type: CALL_METHOD,
    // payload: {
      // request: {
        // url: `/Protected/GetUserInfo`,
        // method: 'POST',
      // },
    // },
  // }
// };
//export const { sendRequestOnMethod, sendRequestOnMethodWithAuthorization, sendRequestOnMethodGetUserDetail } = apiSlice.actions;