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
import { createAsyncThunk } from "@reduxjs/toolkit";

import userApi from '../../api/user_api';
import LoginFormView from "../../views/authorization/login_form_view";
import { notify } from "../../models/notification_model";

// Creating login thunk
const userReLogin = createAsyncThunk('user/userLogin', userApi.login);

// Connecting component view to model with controller
export default connect(
    (state) => ({
        isLoginPending: state.user.loginStatus === 'pending',
        isLoginError:   state.user.loginStatus === 'failed',
        isLoggedIn:     state.user.loginStatus === 'success',
        error:          state.user.error,
        isOffline:      state.user.isOffline,
    }),
    (dispatch) => ({
        login: (login, password) => dispatch(userReLogin({ login: login, password })),
        offline: () => dispatch(notify({ code: 'offlineAuth' })),
    })
)(LoginFormView);