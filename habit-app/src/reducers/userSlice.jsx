import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        isLoadingUser: false,
        error: null,
    },
    reducers: {
        userExpired: (state) => {  
            //Добавить логику refresh token.
            //Действие в случае истекания действия токена.                                          
        },
        storeUserError: (state, action) => { 
            state.error = action.payload;                                           
        },
        userSignedOut: (state) => {    
            state.user = null;
            state.isLoadingUser = false;                                           
        },
        storeUser: (state, action) => {
            
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