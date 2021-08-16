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

import { fetchUserLogin } from "../../models/user_model";
import LoginFormView from "../../views/user/login_form_view";

// Component view, connected to model
export default connect(
    (state) => ({
        isLoginPending: state.user.loginStatus === 'pending',
        isLoginError:   state.user.loginStatus === 'failed',
        isLoginSuccess: state.user.loginStatus === 'success',
        error:          state.user.error
    }),
    (dispatch) => ({
        login: async (login, password) => await dispatch(fetchUserLogin(login, password))
    })
)(LoginFormView);