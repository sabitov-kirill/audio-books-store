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
import {palette} from './../cool_css';
import {Grid, Link} from "@material-ui/core";

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
        marginTop: '20px',
        marginBottom: '5px',
    }

    return (
        isLoginForm
            ? <LoginForm formStyle={formStyle} onSetRegister={onSetRegister} />
            : <RegisterForm  formStyle={formStyle} onSetLogin={onSetLogin} />
    );
}