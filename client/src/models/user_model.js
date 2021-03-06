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

// App store authorization slice
const userSlice = createSlice({
    name: 'user',
    initialState:  {
        name: '',
        isAdmin: false,
        isOffline: !navigator.onLine,
        ownedBooks: [],
        loginStatus: 'unlogged',
        reLoginTried: false,
        error: ''
    },

    reducers: {
        goOnline(state) {
            state.isOffline = false;
        },
        goOffline(state) {
            state.isOffline = true;
        },
    },
 
    extraReducers: {
        // Registration
        'user/userRegister/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userRegister/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.name = action.payload.name;
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
        'user/userLogout/fulfilled': (state) => {
            state.loginStatus = 'loggedout';

            state.name = '';
            state.isAdmin = '';
            state.ownedBooks = '';
        },

        // New book bought
        'user/buyBook/fulfilled': (state, action) => {
            state.ownedBooks.push(action.payload.bookId);
        }
    }
});

export const { goOnline, goOffline } = userSlice.actions;

// User slice reducer
export default userSlice.reducer;