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

function sortedArray(state) {
    let sortedArray = [...state.books.bookStorage];
    return sortedArray.sort((book1, book2) => {
        const isBook1Owned = state.user.ownedBooks.includes(book1.id);
        const isBook2Owned = state.user.ownedBooks.includes(book2.id);

        return Number(isBook2Owned) - Number(isBook1Owned);
    });
}

// Component view, connected to model
export default connect(
    (state) => ({
        books: sortedArray(state),
        ownedBooks: state.user.ownedBooks,
    })
)(BookListView);