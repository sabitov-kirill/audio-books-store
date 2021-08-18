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
import { fetchBook } from "../../models/books_model";

// Component view, connected to model
export default connect(
    (state) => ({
      books: state.books.bookArray,
    }),
    (dispatch) => ({
        visitBookPage: async (book) => await dispatch(fetchBook(book))
    })
)(BookListView);