/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User registration form view handle module.
 *
 */

import { useState } from "react";
import { Redirect } from "react-router-dom";
import {Alert} from "@material-ui/lab";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@material-ui/core";
import {AccountCircle, Visibility, VisibilityOff, Face} from "@material-ui/icons";

// Component view
export default function RegistrationFormView(props) {
    const [values, setValues] = useState({
        name: '',
        login: '',
        password: '',
        isErrorShown: false,
        errorCode: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        if (values.errorCode === 'fields' && values.name && values.login && values.password)
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

    const onRegister = async (e) => {
        e.preventDefault();

        // Set errors codes, if not alling api function
        if (!values.name || !values.login || !values.password) {
            setValues({
                ...values,
                errorCode: 'fields',
                isErrorShown: false
            })
        } else if (values.password.length < 6) {
            setValues({
                ...values,
                errorCode: 'password',
                isErrorShown: false
            })
        } else {
            setValues({
                ...values,
                errorCode: '',
                isErrorShown: true
            });
            props.register(values.name, values.login.toLowerCase().trim(), values.password);
        }
    }

    if (props.isLoggedIn) return <Redirect to='/'/>

    // Errors handle
    let isFieldsError = values.errorCode === 'fields';
    let isPasswordError = values.errorCode === 'password';
    const errorComponent = isFieldsError
            ? <Alert variant="outlined" severity='error'>
                Пожалуйста, заполните все поля.
              </Alert> : isPasswordError
            ? <Alert variant="outlined" severity='error'>
                Пароль должен содержать как минимум 6 символов.
              </Alert> : props.isRegisterError && values.isErrorShown
            ? <Alert variant="outlined" severity='error'>
                {props.error}
              </Alert> : <></>;

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
                <InputLabel htmlFor="outlined-adornment-name">Имя</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-name"
                    type={'text'}
                    value={values.name}
                    error={
                        (props.isRegisterError && values.isErrorShown) ||
                        (isFieldsError && !values.name)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <Face/>
                        </InputAdornment>
                    }
                    onChange={handleChange('name')}
                    labelWidth={30}
                />
            </FormControl>
            </Grid>

            <Grid item>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-login">Логин</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-login"
                    type={'text'}
                    value={values.login}
                    error={
                        (props.isRegisterError && values.isErrorShown) ||
                        (isFieldsError && !values.login)
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
                        (isFieldsError && !values.password)
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
                <FormHelperText id="outlined-adornment-password" style={{fontSize: "xx-small"}}>
                    🛈 Пароль должен содержать как минимум 6 символов.
                </FormHelperText>
            </FormControl>
            </Grid>

            <Grid item>
                {errorComponent}
            </Grid>

            <Grid item>
            <Button
                variant="outline"
                onClick={onRegister}
                type='submit'
                style={{ width: '100%'}}
                disabled={props.isRegisterPending}
            >
                {props.isRegisterPending ? 'Регистрация...' : 'Зарегестрироваться'}
            </Button>
            </Grid>
        </Grid>
    );
}