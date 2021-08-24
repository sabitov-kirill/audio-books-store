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
        isAdmin: false,
        ownedBooks: [],
        loginStatus: 'unlogged',
        reLoginTried: false,
        error: ''
    },
 
    reducers: {},
 
    extraReducers: {
        // Login
        'user/userLogin/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userLogin/fulfilled': (state, action) => {
            state.loginStatus = 'success';
 
            state.name = action.payload.name;
            state.isAdmin = action.payload.isAdmin;
            state.ownedBooks = action.payload.ownedBooks;
        },
        'user/userLogin/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        },

        // Re-login
        'user/userReLogin/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userReLogin/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.name = action.payload.name;
            state.isAdmin = action.payload.isAdmin;
            state.ownedBooks = action.payload.ownedBooks;
        },
        'user/userReLogin/rejected': (state) => {
            state.loginStatus = 'unlogged';
        },
         
        // Registration
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