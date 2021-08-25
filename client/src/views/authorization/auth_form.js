/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Combined login and registration form with action choose.
 *
 */

import { useState } from "react";

import LoginFormController from '../../controllers/user/login_form_controller';
import RegistrationFormController from '../../controllers/user/registration_form_controller';
import './auth.scss';
import {Box, Grid, Link, makeStyles, withStyles} from "@material-ui/core";

const GlobalCss = withStyles({
    '@global': {
        '.MuiButton-root': {
            backgroundColor: '#f9bf7f',
            color: '#444444',
            cursor: 'pointer',
            margin: '5px',
            "&:hover": {
                backgroundColor: "#faa538"
            },
        },
        '.MuiOutlinedInput-adornedEnd': {
            width: '270px',
        },
        '.MuiPaperBase-root': {
            width: '270px',
        },
        '.MuiSvgIcon-root': {
            color: '#faa538',
        },
        '.MuiFormLabel-root.Mui-focused': {
            color: '#faa538',
        },
        '.MuiFormLabel-root': {
            color: '#faa538',
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#f9bf7f',
        },
        '.MuiOutlinedInput-root': {
            '&.hover': {
                borderColor: '#f9bf7f',
            },
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#faa538',
        },
        '.MuiGrid-item': {
            margin: '7px',
        },
    },
})(() => null);

// Component to render if login sign in selected
function LoginForm(props) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1 style={{color: "#faa538"}}>Sign In</h1>
            <div style={props.formStyle}>
                <LoginFormController />
            </div>
            <p style={{textAlign: "center"}}>
                Don' have account yet?
                <Link
                    onClick={props.onSetRegister}
                    style={{color: "#faa538"}}
                > Sign Up!</Link>
            </p>
        </Grid>
    );
}

// Component to render if login sign up selected
function RegisterForm(props) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1>Sign In</h1>
            <div style={props.formStyle}>
                <RegistrationFormController />
            </div>
            <p style={{textAlign: "center"}}>
                Don' have account yet?
                <Link
                    onClick={props.onSetLogin}
                    style={{color: "#faa538"}}
                >Sign In!</Link>
            </p>
        </Grid>
    );
}

// Component view
export default function AuthForm() {
    const [isLoginForm, setIsLoginForm] = useState(true);

    // Evens callbacks handle
    const onSetLogin = () => {
        setIsLoginForm(true);
    }
    // Evens callbacks handle
    const onSetRegister = () => {
        setIsLoginForm(false);
    }

    // Background image style
    const formStyle = {
        width: '400px',
        margin: '0 auto',
        borderRadius: '10px',
    }

    return (
        <div>
            <GlobalCss/>
            {isLoginForm
                ? <LoginForm formStyle={formStyle} onSetRegister={onSetRegister} />
                : <RegisterForm  formStyle={formStyle} onSetLogin={onSetLogin} />}
        </div>
    );
}