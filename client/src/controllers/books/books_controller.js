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
import { fetchBook, fetchBookStorage, filter, sorting, search } from "../../models/books_model";

function refactorBookArray(bookArray, sortKey, filter, searchKey) {
    let refArray = new Array(bookArray?.filter((book) => {
        return true && book?.title.include(searchKey);
    }));
    switch (sortKey) {
        case "All":
            return refArray;
        case "New first":
            return refArray?.sort((a, b) => a?.year - b?.year );
        case "Old first":
            return refArray?.sort((a, b) => b?.year - a?.year );
        case "From A to Z":
            return refArray?.sort((a, b) => a?.title.localeCompare(b?.title) );
        case "From Z to A":
            return refArray?.sort((a, b) => b?.title.localeCompare(a?.title) );
        default:
            return refArray;
    }
}

// Component view, connected to model
export default connect(
    (state) => ({
        books: refactorBookArray(state.books.bookStorage),
        sortKey: state.books.sortKey,
        filters: state.books.filters,
        searchKey: state.books.searchKey,
        isSearch: state.books.searchKey !== '',
    }),
    (dispatch) => ({
        visitBookPage: async (book) => await dispatch(fetchBook(book)),
        initBookStorage: async () => await dispatch(fetchBookStorage()),
        sorting: (key) => dispatch(sorting(key)),
        filter: (key) => dispatch(filter(key)),
        search: (key) => dispatch(search(key)),
    })
)(BookListView);