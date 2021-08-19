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
import { fetchBook, fetchBookStorage, filter, sorting } from "../../models/books_model";

function refactorBookArray(bookArray, sortKey, filter) {
    switch (sortKey) {
        case "All":
            return bookArray; //добавить фильтрацию
        default:
            return bookArray; //добавить фильтрацию
    }
}

// Component view, connected to model
export default connect(
    (state) => ({
        books: refactorBookArray(state.books.bookStorage),
        sort: state.books.sortKey,
        filters: state.books.filters,
    }),
    (dispatch) => ({
        visitBookPage: async (book) => await dispatch(fetchBook(book)),
        initBookStorage: async () => await dispatch(fetchBookStorage()),
        sorting: (key) => dispatch(sorting(key)),
        filter: (key) => dispatch(filter(key)),
    })
)(BookListView);