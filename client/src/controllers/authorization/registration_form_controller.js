/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User registration form controller handle module
 *
 */

import { connect } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

import userApi from '../../api/user_api';
import RegistrationFormView from "../../views/authorization/registration_form_view";
import {notify} from "../../models/notification_model";

// Creating registration thunk
export const userRegister = createAsyncThunk(
    'user/userRegister',
    userApi.registration
);

// Connecting component view to model with controller
export default connect(
    (state) => ({
        isRegisterPending: state.user.loginStatus === 'pending',
        isRegisterError:   state.user.loginStatus === 'failed',
        isLoggedIn:       state.user.loginStatus === 'success',
        error:            state.user.error,
        isOffline:      state.user.isOffline,
    }),
    (dispatch) => ({
        register: (name, login, password) => dispatch(userRegister({ name, login, password })),
        offline: () => dispatch(notify({ code: 'offlineAuth' })),
    })
)(RegistrationFormView);