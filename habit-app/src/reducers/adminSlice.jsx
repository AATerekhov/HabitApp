import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: 'admin',
    initialState:{
        room: null,
        caseHabits: null,
        isAdmin: false,
        person: null,
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
            state.room = action.payload;
            state.isLoadingRoom = false;
        },
        storePerson: (state, action) => {            
            state.person = action.payload;
        },
        storeAdmin: (state, action) => {            
            state.isAdmin = action.payload;
        },
        storeCaseHabits: (state, action) => {
            state.caseHabits = action.payload;
        },
        loadingRoom: (state) => {
            state.isLoadingRoom = true;
        },
    }
});

export const {storeRoomError, roomLeave, storeRoom, loadingRoom, storePerson, storeAdmin, storeCaseHabits } = adminSlice.actions;

export default adminSlice.reducer;