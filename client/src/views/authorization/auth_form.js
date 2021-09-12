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
import { useLocation } from "react-router";

import LoginFormController from '../../controllers/authorization/login_form_controller';
import RegistrationFormController from '../../controllers/authorization/registration_form_controller';
import { Grid, Link } from "@material-ui/core";
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
            {props.fromBuy &&
                <p className="accActCol">Перед покупкой книг необходимо войти.</p>
            }
            <div className="authForm">
                <LoginFormController offline={props.offline} isOffline={props.isOffline} />
            </div>
            <p className="text">
                {"Ещё не зарегестрированы? "}
                <Link
                    onClick={props.onSetRegister}
                    className="accActCol"
                >Зарегистрируйтесь!</Link>
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
            {props.fromBuy &&
                <p className="accActCol">Перед покупкой книг необходимо зарегестрироваться.</p>
            }
            <div  className="authForm">
                <RegistrationFormController offline={props.offline} isOffline={props.isOffline} />
            </div>
            <p className="text">
                {"Уже есть аккаунт? "}
                <Link
                    onClick={props.onSetLogin}
                    className="accActCol"
                >Войдите!</Link>
            </p>
        </Grid>
    );
}

// Component view
export default function AuthForm() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const location = useLocation();
    const fromBuy = location.search.split('=')[1] === 'buy';

    return (
        isLoginForm
            ? <LoginForm onSetRegister={() => setIsLoginForm(false)} fromBuy={fromBuy} />
            : <RegisterForm onSetLogin={() => setIsLoginForm(true)} fromBuy={fromBuy} />
    );
}