/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Books page controller handle module
 *
 */

import { connect } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
 
import BooksPageView from "../../views/books/books_page";
 
import bookApi from '../../api/book_api';
 
const fetchBookStorage = createAsyncThunk(
    'books/fetchBookStorage',
    bookApi.downloadAllBooks
);
 
// Component view, connected to model
export default connect(
    null,
    (dispatch) => ({
        initBookStorage: async () => await dispatch(fetchBookStorage()),
    })
)(BooksPageView);
