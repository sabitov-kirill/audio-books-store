/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User model declaration module.
 *
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Trunks for calling user API
const fetchUserLogin = createAsyncThunk(
    'user/fetchUserLogin',
    async (name, password) => {
        return { bag: [], books: [] };
    }
);

// App store user slice
const userSlice = createSlice({
    name: 'user',
    initialState:  {
        bag: [],
        books: [],
        loginStatus: 'unlogged',
        error: ''
    },

    reducers: {},

    extraReducers: {
        [fetchUserLogin.pending]: (state) => {
            state.loginStatus = 'pending'
        },
        [fetchUserLogin.fulfilled]: (state, action) => {
            state.loginStatus = 'success'
            state.bag = action.payload.bag;
            state.books = action.payload.books;
        },
        [fetchUserLogin.rejected]: (state, action) => {
            state.loginStatus = 'failed'
            state.error = action.error.message;
        }
    }
});

// User slice reducer actions
export { fetchUserLogin };

// User slice reducer
export default userSlice.reducer;