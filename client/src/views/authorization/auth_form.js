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
import {Grid, Link} from "@material-ui/core";
import './auth.scss'

// Component to render if login sign in selected
function LoginForm(props) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1 className="accActCol start-margin">Вход</h1>
            <div className="authForm">
                <LoginFormController />
            </div>
            <p className="text">
                {"Ещё не зарегестрированы? "}
                <Link
                    onClick={props.onSetRegister}
                    className="accActCol"
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
            <h1 className="accActCol start-margin">Регистрация</h1>
            <div  className="authForm">
                <RegistrationFormController />
            </div>
            <p className="text">
                {"Уже есть аккаунт? "}
                <Link
                    onClick={props.onSetLogin}
                    className="accActCol"
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

    return (
        isLoginForm
            ? <LoginForm onSetRegister={onSetRegister} />
            : <RegisterForm onSetLogin={onSetLogin} />
    );
}