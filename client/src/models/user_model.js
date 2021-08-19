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
        id: '',
        name: '',
        email: '',
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

            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.bagBooks = action.payload.bagBooks;
            state.ownedBooks = action.payload.ownedBooks;
        },
        'user/userLogin/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        },

        'user/userRegistr/pending': (state) => {
            state.loginStatus = 'pending';
        },
        'user/userRegistr/fulfilled': (state, action) => {
            state.loginStatus = 'success';

            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        'user/userRegistr/rejected': (state, action) => {
            state.loginStatus = 'failed';
            state.error = action.error.message;
        }
    }
});

// User slice reducer
export default userSlice.reducer;