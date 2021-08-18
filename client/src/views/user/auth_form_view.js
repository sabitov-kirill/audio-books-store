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

import LoginForm from '../../controllers/user/login_form_controller';
import RegistrationForm from '../../controllers/user/registration-form-controller';

// Component view
export default function AuthForm(props) {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const isMobile = navigator.userAgentData.mobile;

    // Evens callbacks handle
    const onSetRegistr = () => {
        setIsLoginForm(false);
    }
    const onSetLogin = () => {
        setIsLoginForm(true);
    }

    // Rendering content
    let Content;

    // Background image style
    const formStyle = {
        width: '400px',
        margin: '0 auto',
        backgroundColor: 'lightgray',
        borderRadius: '10px',
    }

    // Form for mobile devices
    if (isMobile) Content =
            <>
                {isLoginForm &&
                <div className='d-flex flex-column justify-content-center'>
                    <h1 className='mx-auto my-5'>Sign In</h1>
                    <LoginForm />
                    <p className='mx-auto'>
                        Don' have account yet?
                        <button
                            type="button"
                            className="btn btn-link m-0 p-0 ps-1"
                            onClick={onSetRegistr}
                            style={{color: 'gray'}}
                        >Sign Up!</button>
                    </p>
                </div>
                }
                {!isLoginForm &&
                <div className='d-flex flex-column justify-content-center'>
                    <h1 className='mx-auto my-5'>Sign Up</h1>
                    <RegistrationForm />
                    <p className='mx-auto'>
                        Already have an account?
                        <button
                            type="button"
                            className="btn btn-link m-0 p-0 ps-1"
                            onClick={onSetLogin}
                            style={{color: 'gray'}}
                        >Sign In!</button>
                    </p>
                </div>
                }
            </>
    else Content =
        <>
            {isLoginForm &&
            <div className='d-flex flex-column justify-content-center'>
                <h1 className='mx-auto my-5'>Sign In</h1>
                <div style={formStyle}>
                    <LoginForm />
                </div>
                <p className='mx-auto'>
                    Don' have account yet?
                    <button
                        type="button"
                        className="btn btn-link m-0 p-0 ps-1"
                        onClick={onSetRegistr}
                        style={{color: 'gray'}}
                    >Sign Up!</button>
                </p>
            </div>
            }
            {!isLoginForm &&
            <div className='d-flex flex-column justify-content-center'>
                <h1 className='mx-auto my-5'>Sign Up</h1>
                <div style={formStyle}>
                    <RegistrationForm />
                </div>
                <p className='mx-auto'>
                    Already have an account?
                    <button
                        type="button"
                        className="btn btn-link m-0 p-0 ps-1"
                        onClick={onSetLogin}
                        style={{color: 'gray'}}
                    >Sign In!</button>
                </p>
            </div>
            }
        </>

    return Content;
}