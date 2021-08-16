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

// Component view
export default function LoginFormView(props) {
    // Input fields states
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // On login callback
    const onLogin = async (e) => await props.login(name, password)

    // Rendering element
    return (
        <>
            <h1>Login Form</h1>
            <input
                id='loginInput'
                type='text'
                value={name}
                placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                id='passwordInput'
                type='password'
                value={password}
                placeholder='Enter Your Password'
                onChange={(e) => setPassword(e.target.value)}
            />

            {props.isLoginError && <h1 className='errorMessage'>{props.error}</h1>}
            {props.isLoginSuccess && <Redirect to='/'/>}

            <button onClick={onLogin} disabled={!name || !password || props.isLoginPending}>
                Submit
            </button>
        </>
    );
}