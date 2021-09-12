/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User login form view handle module.
 *
 */

import { useEffect, useState } from "react";
import {
    InputLabel, OutlinedInput,
    InputAdornment, IconButton,
    FormControl, Button, Grid
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab';
import {
    AccountCircle,
    Visibility, VisibilityOff
} from "@material-ui/icons";

// Component view
export default function LoginFormView(props) {
    const [values, setValues] = useState({
        login: '',
        password: '',
        isErrorShown: false,
        errorCode: '',
        showPassword: false,
    });

    const warnOffline = props.offline;
    useEffect(() => {
        if (props.isOffline) warnOffline();
    }, [props.isOffline, warnOffline]);

    const handleChange = (prop) => (event) => {
        const newValues = {...values};
        if (values.errorCode === 'fields' && values.login && values.password)
            setValues({
                ...newValues,
                errorCode: ''
            });
        setValues({
            ...newValues,
            isErrorShown: false,
            [prop]: event.target.value
        });
    };

    const handleClickShowPassword = () => {
        const newValues = {...values};
        setValues({ ...newValues, showPassword: !newValues.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onLogin = async (e) => {
        e.preventDefault();
        const newValues = {...values};
        if (!values.login || !values.password) {
            setValues({
                ...newValues,
                isErrorShown: true,
                errorCode: 'fields'
            });
        } else {
            setValues({
                ...newValues,
                isErrorShown: true
            });
            await props.login(values.login.toLowerCase().trim(), values.password);
        }
    }
    
    if (props.isLoggedIn) document.location.replace('/');

    // Rendering element
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-login">Логин</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-login"
                    type={'text'}
                    value={values.login}
                    error={
                        (props.isLoginError && values.isErrorShown) ||
                        (values.errorCode === 'fields' && !values.login)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <AccountCircle className="accActCol" />
                        </InputAdornment>
                    }
                    onChange={handleChange('login')}
                    labelWidth={40}
                />
            </FormControl>
            </Grid>

            <Grid item>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    error={
                        (props.isLoginError && values.isErrorShown) ||
                        (values.errorCode === 'fields' && !values.password)
                    }
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                className="accActCol"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            </Grid>

            <Grid item>
            {
                props.isLoginError &&
                values.isErrorShown &&
                <Alert variant="outlined" severity='error'>{props.error}</Alert>
            }
            {
                values.errorCode === 'fields' &&
                <Alert variant="outlined" severity='error'>Пожалуйста, заполните все поля.</Alert>
            }
            </Grid>

            <Grid item>
            <Button
                onClick={(e) => {
                    if (props.isOffline)
                        props.offline();
                    else
                        return onLogin(e);
                }}
                type='submit'
                disabled={props.isLoginPending}
            >
                {props.isLoginPending ? 'Вход...' : 'Войти'}
            </Button>
            </Grid>
        </Grid>
    );
}