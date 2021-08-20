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

function refactorBookArray(state) {
    let refArray = new Array(state.books.bookStorage.filter((book) => {
        if (state.filters.has("Owned") && !state.user.ownedBooks.has(book.id))
            return false;
        return book.title.include(state.books.searchKey);
    }));
    switch (state.books.sortKey) {
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
        books: refactorBookArray(state),
    })
)(BookListView);