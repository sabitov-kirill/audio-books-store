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

import {connect} from "react-redux";
import {createAsyncThunk} from "@reduxjs/toolkit";

import LoginFormView from "../../views/user/login_form_view";

// Creating login thunk
const fetchUserLogin = createAsyncThunk(
    'user/fetchUserLogin',
    async (loginData) => {
        const response = await fetch('/api/user/login', {
            method: "POST",
            headers: {"Contet-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    }
);

// Connecting component view to model with controller
export default connect(
    (state) => ({
        isLoginPending: state.user.loginStatus === 'pending',
        isLoginError:   state.user.loginStatus === 'failed',
        isLoggedIn:     state.user.loginStatus === 'success',
        error:          state.user.error
    }),
    (dispatch) => ({
        login: (email, password) => dispatch(fetchUserLogin({ email, password }))
    })
)(LoginFormView);