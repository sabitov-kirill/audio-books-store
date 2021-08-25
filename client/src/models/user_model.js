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
        // Registration
        'user/userRegister/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userRegister/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.login = action.payload.login;
        },
        'user/userRegister/rejected': (state, action) => {
            state.loginStatus = 'failed';
            
            state.error = action.error.message;
        },

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
         
        // Logout
        'user/userLogout/fullfiled': (state) => {
            state.loginStatus = 'loggedout'
        }
    }
});
 
// User slice reducer
export default userSlice.reducer;