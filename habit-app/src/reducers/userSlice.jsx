import { createSlice } from "@reduxjs/toolkit"
import { setAuthHeader } from '../utils/axiosHeaders'

const initialState = {
    user: null,
    isLoadingUser: false
  };

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExpired: (state) => {                                            
        },
        storeUserError: (state) => {                                            
        },
        userSignedOut: (state) => {    
            state.user = null;
            state.isLoadingUser = false;                                           
        },
        storeUser: (state, action) => {
            setAuthHeader(action.payload.access_token)
            state.user = action.payload;
            state.isLoadingUser = false;
        },
        loadingUser: (state) => {
            state.isLoadingUser = true;
        },
    }
});

export const {userExpired, storeUserError, userSignedOut, storeUser, loadingUser } = userSlice.actions;
export default userSlice.reducer;