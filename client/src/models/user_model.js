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

import { createSlice } from "@reduxjs/toolkit";

// App store user slice
const userSlice = createSlice({
    name: 'user',
    initialState:  {
        name: '',
        bagBooks: [],
        ownedBooks: [],
        loginStatus: 'unlogged',
        error: ''
    },
 
    reducers: {},
 
    extraReducers: {
        'user/userLogin/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userLogin/fulfilled': (state, action) => {
            state.loginStatus = 'success';
 
            state.name = action.payload.name;
            state.bagBooks = action.payload.bagBooks;
            state.ownedBooks = action.payload.ownedBooks;
        },
        'user/userLogin/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        },

        'user/userReLogin/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.name = action.payload.name;
            state.bagBooks = action.payload.bagBooks;
            state.ownedBooks = action.payload.ownedBooks;
        },
 
        'user/userRegistr/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userRegistr/fulfilled': (state, action) => {
            state.loginStatus = 'success';
 
            state.name = action.payload.name;
        },
        'user/userRegistr/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        }
    }
});
 
// User slice reducer
export default userSlice.reducer;