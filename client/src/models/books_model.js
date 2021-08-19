/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Books model declaration module.
 *
 */

import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        bookArray: [],
        filters: '',
        sortKey: '',
        selectingStatus: "unselected",
        selectedBook: {},
        error: '',
    },
    reducers: {},

    extraReducers: {
        'books/fetchBook/pending': (state) => {
            state.selectingStatus = 'pending'
        },
        'books/fetchBook/fulfilled': (state, action) => {
            state.selectingStatus = 'selected'
            state.selectedBook = action.payload;
        },
        'books/fetchBook/rejected': (state, action) => {
            state.selectingStatus = 'failed'
            state.error = action.error.message;
        }
    },
});

// Books slice reducer
export default booksSlice.reducer;