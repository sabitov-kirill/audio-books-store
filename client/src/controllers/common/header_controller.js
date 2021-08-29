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
 
 import userApi from '../../api/user_api';
 import HeaderView from "../../views/common/header_view";
 
 // Creating auto re-login thunk
 const userLogout = createAsyncThunk(
    'authorization/userLogout',
    userApi.logout
 );
 
// Connecting component view to model with controller
export default connect(
    (state) => ({
        isLoggedIn: state.user.loginStatus === 'success',
        isLogoutSuccess: state.user.loginStatus === 'loggedout',
        userName: state.user.name
    }),
    (dispatch) => ({
        userLogout: () => dispatch(userLogout())
    })
)(HeaderView);