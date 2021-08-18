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
        'user/fetchUserLogin/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/fetchUserLogin/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.name = action.payload.name;
            state.bagBooks = action.payload.bagBooks;
            state.ownedBooks = action.payload.ownedBooks;
        },
        'user/fetchUserLogin/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        },

        'user/fetchUserRegistr/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/fetchUserRegistr/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.name = action.payload.name;
        },
        'user/fetchUserRegistr/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        }
    }
});

// User slice reducer
export default userSlice.reducer;