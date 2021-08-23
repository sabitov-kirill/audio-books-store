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

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        bookStorage: [],
        filterOptions: ["Owned"],
        filters: [],
        sortKey: "New first",
        searchKey: '',
        selectingStatus: "unselected",
        selectedBook: {},
        status: "unloaded",
        error: '',
    },
    reducers: {
        filter: (state, key) => {
            state.filters = key.payload;
        },
        sorting: (state, key) => {
            state.sortKey = key.payload;
        },
        search: (state, key) => {
            state.searchKey = key.payload;
        },
    },

    extraReducers: {
        'books/fetchBook/pending': (state) => {
            state.selectingStatus = 'pending';
        },
        'books/fetchBook/fulfilled': (state, action) => {
            state.selectingStatus = 'selected';
            state.selectedBook = action.payload;
        },
        'books/fetchBook/rejected': (state, action) => {
            state.selectingStatus = 'failed';
            state.error = action.error.message;
        },
        
        'books/fillBooksStorage/pending': (state) => {
            state.status = 'pending';
        },
        'books/fillBooksStorage/fulfilled': (state, action) => {
            state.status = 'loaded';
            state.bookStorage = action.payload.books
        },
        'books/fillBooksStorage/rejected': (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

// Books slice reducer actions
export const { filter, sorting, search } = booksSlice.actions;

// Books slice reducer
export default booksSlice.reducer;
