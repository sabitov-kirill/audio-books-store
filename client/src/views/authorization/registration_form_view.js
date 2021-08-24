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
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Email validation function
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Component view
export default function RegistrationFormView(props) {
    // Input fields states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Errors showing states
    const [isErrorShown, setIsErrorShown] = useState(true);
    const [errorCode, setErrorCode] = useState('');

    // Evens callbacks handle
    const onNameInput = (e) => {
        setName(e.target.value);
        setIsErrorShown(false);
        if (isFieldsError && name && email && password) {
            setErrorCode('');
        }
    }
    const onEmailInput = (e) => {
        setEmail(e.target.value);
        setIsErrorShown(false);
        if (isFieldsError && name && email && password) {
            setErrorCode('');
        }
    }
    const onPasswordInput = (e) => {
        setPassword(e.target.value);
        setIsErrorShown(false);
        if (isFieldsError && name && email && password) {
            setErrorCode('');
        }
    }
    const onRegistr = async (e) => {
        e.preventDefault();

        // Set errors codes, if not alling api function
        if (!name || !email || !password) {
            setErrorCode('fields');
            setIsErrorShown(false);
        } else if (!validateEmail(email)) {
            setErrorCode('email');
            setIsErrorShown(false);
        } else if (password.length < 6) {
            setErrorCode('password');
            setIsErrorShown(false);
        } else {
            setErrorCode('');
            setIsErrorShown(true);
            props.registr(name, email.toLowerCase().trim(), password);
        }
    }

    if (props.isLoggedIn) return <Redirect to='/books'/>

    // Errors handle
    let isFieldsError = errorCode === 'fields';
    let isEmailError = errorCode === 'email';
    let isPasswordError = errorCode === 'password';
    const errorComponent =
        isFieldsError   ? <Alert variant='danger'>Please, fill all the fields to register.</Alert>          :
        isEmailError    ? <Alert variant='danger'>Please, enter valid email address.</Alert>                :
        isPasswordError ? <Alert variant='danger'>Please, create password of at least 6 characters.</Alert> :
        props.isRegistrError && isErrorShown ? <Alert variant='danger'>{props.error}</Alert> : <></>;

    // Rendering element
    return (
        <div className="d-grid gap-3 p-3 authForm">
            <Form className="d-grid gap-3">
                <Form.Group>
                    <FloatingLabel label="Enter your name">
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            onChange={onNameInput}
                            isInvalid={(props.isRegistrError && isErrorShown) || (isFieldsError && !name)}
                            style={{backgroundColor: '#ffffffaa'}}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="Enter your email">
                        <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            onChange={onEmailInput}
                            isInvalid={(props.isRegistrError && isErrorShown) || (isFieldsError && !email) || isEmailError}
                            style={{backgroundColor: '#ffffffaa'}}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="Enter your password">
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            onChange={onPasswordInput}
                            isInvalid={(props.isRegistrError && isErrorShown) || (isFieldsError && !password) || isPasswordError}
                            style={{backgroundColor: '#ffffffaa'}}
                        />
                    </FloatingLabel>
                    <Form.Text className='m-0 p-0'>🛈 Password must be at least 6 characters long.</Form.Text>
                </Form.Group>

                {errorComponent}

                <Button
                    variant="outline-dark"
                    onClick={onRegistr}
                    type='submit'
                    disabled={props.isLoginPending}
                >
                    {props.isRegistrPending ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
}