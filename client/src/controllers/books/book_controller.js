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
import { createAsyncThunk } from "@reduxjs/toolkit";

import { notify } from "../../models/notification_model";
import BookView from "../../views/books/book_view";
import userApi from '../../api/user_api';

// Trunk for calling user API
export const buyBook = createAsyncThunk(
    'user/buyBook',
    userApi.buyBook
);

// Component view, connected to model
export default connect(
    (state) => ({
        isLoggedIn: state.user.loginStatus === 'success',
        isOffline: state.user.isOffline,
    }),
    (dispatch) => ({
        offlineBuyWarn: (book) => dispatch(notify({ code: 'offlineBuy' })),
        buyBook: (book) => dispatch(buyBook({ bookId: book.id }))
    })
)(BookView);