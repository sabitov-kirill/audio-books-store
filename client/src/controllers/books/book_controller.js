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

import BookView from "../../views/books/book_view";
import bookApi from '../../api/book_api';

// Trunks for calling books API
export const buyBook = createAsyncThunk(
    'books/buyBook'
);

// Component view, connected to model
export default connect(
    null,
    (dispatch) => ({
        buyBook: async (book) => await dispatch(buyBook(book))
    })
)(BookView);