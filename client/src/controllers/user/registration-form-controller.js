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

import {connect} from "react-redux";
import {createAsyncThunk} from "@reduxjs/toolkit";

import RegistrationFormView from "../../views/user/registration_form_view";

// Creating registration thunk
export const fetchUserRegistr = createAsyncThunk(
    'user/fetchUserRegistr',
    async (registrationData) => {
        const response = await fetch('/api/user/registration', {
            method: "POST",
            headers: {"Contet-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(registrationData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    }
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
        registr: (name, email, password) => dispatch(fetchUserRegistr({ name, email, password }))
    })
)(RegistrationFormView);