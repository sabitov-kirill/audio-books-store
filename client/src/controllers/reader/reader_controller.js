/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User login form controller handle module
 *
 */

import { connect } from "react-redux";

import { notify } from "../../models/notification_model";
import { init, close, autoPlay, autoNextPage, switchControlPanel } from "../../models/reader_model";
import ReaderView from "../../views/reader/reader_view";

// Connecting component view to model with controller
export default connect(
    (state) => ({
        ownedBooks: state.user.ownedBooks,
        isLoggedIn: state.user.loginStatus === 'success',
        isLoading: state.user.loginStatus === 'pending',
        books: state.books.bookStorage,
    }),
    (dispatch) => ({
        init: (bookData) => dispatch(init(bookData)),
        close: () => dispatch(close()),
        autoPlay: () => dispatch(autoPlay()),
        autoNextPage: () => dispatch(autoNextPage()),
        flipNotify: () => dispatch(notify({ code: 'flip' })),
    })
)(ReaderView);