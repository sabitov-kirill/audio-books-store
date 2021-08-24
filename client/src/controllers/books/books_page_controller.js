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
  
import bookApi from '../../api/book_api';
import BooksPageView from "../../views/books/list_page/books_page";
 
const fillBooksStorage = createAsyncThunk(
    'books/fillBooksStorage',
    bookApi.fetchBooksCards
);
 
// Component view, connected to model
export default connect(
    null,
    (dispatch) => ({
        initBookStorage: async () => await dispatch(fillBooksStorage()),
    })
)(BooksPageView);
