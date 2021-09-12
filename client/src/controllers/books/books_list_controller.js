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
        const isBook1CanBuy = book1.status === 'canbuy';
        const isBook2CanBuy = book2.status === 'canbuy';
        const isBook1Premiere = book1.status === 'premiere';
        const isBook2Premiere = book2.status === 'premiere';
        const isBook1InDev = book1.status === 'indev';
        const isBook2InDev = book2.status === 'indev';

        const yearsDiff = book1.year - book2.year;

        if (isBook1Owned || isBook2Owned) {
            const diff = Number(isBook2Owned) - Number(isBook1Owned);
            if (!diff) return yearsDiff;
            return diff;
        } else {
            if (isBook1CanBuy   || isBook2CanBuy) {
                const diff = Number(isBook2CanBuy) - Number(isBook1CanBuy);
                if (!diff) return yearsDiff;
                return diff;
            }
            if (isBook1Premiere || isBook2Premiere) {
                const diff =  Number(isBook2Premiere) - Number(isBook1Premiere);
                if (!diff) return yearsDiff;
                return diff;
            }
            const diff =  Number(isBook2InDev) - Number(isBook1InDev);
            if (!diff) return yearsDiff;
            return diff;
        }
    });
}

// Component view, connected to model
export default connect(
    (state) => ({
        books: sortedArray(state),
        ownedBooks: state.user.ownedBooks,
    })
)(BookListView);