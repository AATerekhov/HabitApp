import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: 'admin',
    initialState:{
        room: null,
        isLoadingRoom: false,
        error: null,
    },
    reducers: {
        storeRoomError: (state, action) => { 
            state.error = action.payload;                                           
        },
        roomLeave: (state) => {    
            state.room = null;
            state.isLoadingRoom = false;                                           
        },
        storeRoom: (state, action) => {
            
            state.user = action.payload;
            state.isLoadingRoom = false;
        },
        loadingRoom: (state) => {
            state.isLoadingRoom = true;
        },
    }
});

export const {storeRoomError, roomLeave, storeRoom, loadingRoom } = adminSlice.actions;

export default adminSlice.reducer;