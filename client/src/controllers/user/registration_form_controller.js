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

// Creating registration thunk
export const userRegistr = createAsyncThunk(
    'user/userRegistr',
    userApi.registration
);

// Connecting component view to model with controller
export default connect(
    (state) => ({
        isRegistrPending: state.user.loginStatus === 'pending',
        isRegistrError:   state.user.loginStatus === 'failed',
        isLoggedIn:       state.user.loginStatus === 'success',
        error:            state.user.error
    }),
    (dispatch) => ({
        registr: (name, email, password) => dispatch(userRegistr({ name, email, password }))
    })
)(RegistrationFormView);