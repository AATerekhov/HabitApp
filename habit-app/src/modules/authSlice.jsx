// authSlice.js v1.0
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userManager from '../services/authConfig';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };
  // Обработка событий UserManager
  userManager.events.addUserLoaded((user) => {
    console.log('User loaded:', user);
  });
  
  userManager.events.addAccessTokenExpiring(() => {
    console.log('Access token expiring...');
  });
  
  userManager.events.addAccessTokenExpired(() => {
    console.log('Access token expired. Logging out...');
    userManager.signoutRedirect();
  });
  
  userManager.events.addSilentRenewError((error) => {
    console.error('Silent renew error:', error);
  });
  
  export const login = createAsyncThunk('auth/login', async () => {
    await userManager.signinRedirect();
  });
  
  export const logout = createAsyncThunk('auth/logout', async () => {
    await userManager.signoutRedirect();
  });
  
  export const handleCallback = createAsyncThunk('auth/handleCallback', async () => {
    const user = await userManager.signinRedirectCallback();
    return user;
  });

  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder 
        // Обработка начала выполнения handleSignInCallback
        .addCase(handleCallback.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        // Обработка успешного завершения handleSignInCallback
        .addCase(handleCallback.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        // Обработка ошибки в handleSignInCallback
        .addCase(handleCallback.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default authSlice.reducer;