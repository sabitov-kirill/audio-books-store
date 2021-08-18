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

class BookClass {
    constructor(id, title, imgPath, pagePath, status) {
        this.id = id;
        this.title = title;
        this.imgPath = imgPath;
        this.pagePath = pagePath;
        this.status = status;
    }
}

// Trunks for calling books API
const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (book) => {
        return book;
    }
);

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        bookArray: [new BookClass(1, "123a", "", "/", "need-to-buy")],
        filters: '',
        sortKey: '',
        selectingStatus: "unselected",
        selectedBook: {},
        error: '',
    },
    reducers: {},

    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.selectingStatus = 'pending'
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.selectingStatus = 'selected'
            state.selectedBook = action.payload;
        },
        [fetchBook.rejected]: (state, action) => {
            state.selectingStatus = 'failed'
            state.error = action.error.message;
        }
    },
});

// Books slice reducer actions
export { fetchBook };

// Books slice reducer
export default booksSlice.reducer;