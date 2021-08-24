/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Books controller handle module
 *
 */

import { connect } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

import BookView from "../../views/books/card/book_view";
import bookApi from '../../api/book_api';

// Trunks for calling books API
export const fetchBook = createAsyncThunk(
    'books/fetchBook', bookApi.testFunc
);

// Component view, connected to model
export default connect(
    (state) => ({
        isOwned: state.user.ownedBooks.includes(state.books.selectedBook.id),
    }),
    (dispatch) => ({
        select: async (book) => await dispatch(fetchBook(book))
    })
)(BookView);