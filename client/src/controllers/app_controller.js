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
import { createAsyncThunk } from "@reduxjs/toolkit";

import userApi from '../api/user_api';
import AppView from "../views/app_view";

// Creating auto re-login thunk
const userReLogin = createAsyncThunk(
    'user/userLogin',
    async () => (await userApi.reLogin())
);

// Connecting component view to model with controller
export default connect(
    null,
    (dispatch) => ({
        userReLogin: (email, password) => dispatch(userReLogin())
    })
)(AppView);