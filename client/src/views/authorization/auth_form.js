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

import {useEffect, useState} from "react";

import LoginFormController from '../../controllers/authorization/login_form_controller';
import RegistrationFormController from '../../controllers/authorization/registration_form_controller';
import {Grid, Link} from "@material-ui/core";
import './auth.scss'

// Component to render if login sign in selected
function LoginForm(props) {
    useEffect(() => {
        if (props.isOffline)
            props.offline();
    }, [props.isOffline]);

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1 className="accActCol start-margin">Вход</h1>
            <div className="authForm">
                <LoginFormController offline={props.offline} isOffline={props.isOffline} />
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
    useEffect(() => {
        if (props.isOffline)
            props.offline();
    }, [props.isOffline]);

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1 className="accActCol start-margin">Регистрация</h1>
            <div  className="authForm">
                <RegistrationFormController offline={props.offline} isOffline={props.isOffline} />
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
export default function AuthForm(props) {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isOffline, setIsOffline] = useState(!navigator.onLine)

    useEffect(() => {
        const goOffline = () => setIsOffline(true);
        const goOnline = () => setIsOffline(false);

        window.addEventListener('offline', goOffline);
        window.addEventListener('online', goOnline);

        return () => {
            window.removeEventListener('offline', goOffline);
            window.removeEventListener('online', goOnline);
        }
    }, []);

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
            ? <LoginForm isOffline={isOffline} offline={props.offline} onSetRegister={onSetRegister} />
            : <RegisterForm isOffline={isOffline} offline={props.offline} onSetLogin={onSetLogin} />
    );
}