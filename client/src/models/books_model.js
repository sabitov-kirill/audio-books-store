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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Trunks for calling books API
const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (book) => {
        return book;
    }
);

const fetchBookStorage = createAsyncThunk(
    'books/fetchBookStorage',
    async () => {
        let bookList;
        // запрос на получение данных из бд
        return JSON.parse(bookList);
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        bookStorage: [],
        filters: "All",
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
        [fetchBook.pending]: (state) => {
            state.selectingStatus = 'pending';
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.selectingStatus = 'selected';
            state.selectedBook = action.payload;
        },
        [fetchBook.rejected]: (state, action) => {
            state.selectingStatus = 'failed';
            state.error = action.error.message;
        },
        [fetchBookStorage.pending]: (state) => {
            state.status = 'pending';
        },
        [fetchBookStorage.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.bookStorage = new Array(action.payload)
        },
        [fetchBookStorage.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

// Books slice reducer actions
export { fetchBook, fetchBookStorage };
export const { filter, sorting, search } = booksSlice.actions;

// Books slice reducer
export default booksSlice.reducer;