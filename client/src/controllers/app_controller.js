/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Main application component controller handle.
 *
 */

import { connect } from "react-redux";
import { createAsyncThunk, configureStore } from "@reduxjs/toolkit";

import userReducer from '../models/user_model';
import booksReducer from '../models/books_model';
import readerReducer from '../models/reader_model';
import notificationReducer from '../models/notification_model'

import userApi from '../api/user_api';
import AppView from "../views/app_view";

// Application global states store creation
export const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
    notification: notificationReducer,
    reader: readerReducer,
  },
});

// Creating auto re-login thunk
const userReLogin = createAsyncThunk(
    'user/userReLogin',
    userApi.reLogin
);

// Connecting component view to model with controller
export default connect(
  null,
  (dispatch) => ({
    userReLogin: () => dispatch(userReLogin())
  })
)(AppView);