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

const palette = {
    accent: '#f9bf7f',
    accentActive: '#fa7f38',
    background: '#e6c7a9',
    main: '#ffebc5',
    text: '#8a7764',
};

const GlobalCss = withStyles({
    '@global': {
        '.MuiButton-root': {
            backgroundColor: palette.accent,
            color: palette.text,
            cursor: 'pointer',
            margin: '5px',
            "&:hover": {
                backgroundColor: palette.accentActive
            },
            "&:active": {
                backgroundColor: palette.accentActive
            },
        },
        '.MuiOutlinedInput-adornedEnd': {
            width: '270px',
        },
        '.MuiInputBase-input': {
            color: palette.text,
        },
        '.MuiPaperBase-root': {
            width: '270px',
        },
        '.MuiSvgIcon-root': {
            color: palette.accentActive,
        },
        '.MuiFormLabel-root.Mui-focused': {
            color: palette.accentActive,
        },
        '.MuiFormLabel-root': {
            color: palette.accent,
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: palette.accent,
        },
        '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.accent,
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.accentActive,
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
            <h1 style={{color: palette.accentActive}}>Вход</h1>
            <div style={props.formStyle}>
                <LoginFormController />
            </div>
            <p style={{color: palette.text, textAlign: "center"}}>
                {"Ещё не зарегестрированы? "}
                <Link
                    onClick={props.onSetRegister}
                    style={{color: palette.accentActive}}
                >Регистрация!</Link>
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
            <h1 style={{color: palette.accentActive}}>Регистрация</h1>
            <div style={props.formStyle}>
                <RegistrationFormController />
            </div>
            <p style={{color: palette.text, textAlign: "center"}}>
                {"Уже есть аккаунт? "}
                <Link
                    onClick={props.onSetLogin}
                    style={{color: palette.accentActive}}
                >Вход!</Link>
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
        background: palette.main,
        color: palette.text,
        paddingTop: '10px',
        paddingBottom: '3px',
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