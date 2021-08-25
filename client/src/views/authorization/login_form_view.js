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

import { useState } from "react";
import { Redirect } from "react-router-dom";
import {
    InputLabel, OutlinedInput,
    InputAdornment, IconButton,
    FormControl, Button, Grid, withStyles, makeStyles
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

    const handleChange = (prop) => (event) => {
        if (values.errorCode === 'fields' && values.login && values.password)
            setValues({
                ...values,
                errorCode: ''
            });
        setValues({
            ...values,
            isErrorShown: false,
            [prop]: event.target.value
        });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onLogin = async (e) => {
        e.preventDefault();

        if (!values.login || !values.password) {
            setValues({
                ...values,
                isErrorShown: true,
                errorCode: 'fields'
            });
        } else {
            setValues({
                ...values,
                isErrorShown: true
            });
            await props.login(values.login.toLowerCase().trim(), values.password);
        }
    }
    
    if (props.isLoggedIn) return <Redirect to='/'/>

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
                            <AccountCircle/>
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
                values.isFieldsError &&
                <Alert variant="outlined" severity='error'>Пожалуйста, заполните все поля.</Alert>
            }
            </Grid>

            <Grid item>
            <Button
                onClick={onLogin}
                type='submit'
                disabled={props.isLoginPending}
            >
                {props.isLoginPending ? 'Вход...' : 'Войти'}
            </Button>
            </Grid>
        </Grid>
    );
}