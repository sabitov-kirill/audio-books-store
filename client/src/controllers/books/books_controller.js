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

import BookListView from "../../views/books/books_list_view";
import { createAsyncThunk } from "@reduxjs/toolkit";
import bookApi from '../../api/book_api';


// <<book>> data structure:
//    title:       String
//    author:      String
//    description: String
//    price:       Number
//    data:        ??? (current String)

// Trunks for calling books API
const fetchBook = createAsyncThunk(
    'books/fetchBook', bookApi.testFunc
);

// Component view, connected to model
export default connect(
    (state) => ({
      books: state.books.bookArray,
    }),
    (dispatch) => ({
        visitBookPage: async (book) => await dispatch(fetchBook(book))
    })
)(BookListView);