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
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// Component view
export default function LoginFormView(props) {
    // Input fields states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Errors showing states
    const [isErrorShown, setIsErrorShown] = useState(true);
    const [isFieldsError, setIsFieldsError] = useState(false);

    // Evens callbacks handle
    const onEmailInput = (e) => {
        if (isFieldsError && email && password) setIsFieldsError(false);
        setIsErrorShown(false);
        setEmail(e.target.value)
    }
    const onPasswordInput = (e) => {
        if (isFieldsError && email && password) setIsFieldsError(false);
        setIsErrorShown(false);
        setPassword(e.target.value)
    }
    const onLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setIsFieldsError(true);
            setIsErrorShown(false);
        } else {
            setIsErrorShown(true);
            await props.login(email.toLowerCase().trim(), password);
        }
    }
    
    if (props.isLoggedIn) return <Redirect to='/books'/>

    // Rendering element
    return (
        <div className="d-grid gap-3 p-3 authForm">
            <Form className="d-grid gap-3">
                <Form.Group>
                    <FloatingLabel label="Enter your email">
                        <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            onChange={onEmailInput}
                            isInvalid={(props.isLoginError && isErrorShown) || (isFieldsError && !email)}
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
                            isInvalid={(props.isLoginError && isErrorShown) || (isFieldsError && !password)}
                            style={{backgroundColor: '#ffffffaa'}}
                        />
                    </FloatingLabel>
                </Form.Group>

                {props.isLoginError && isErrorShown && <Alert variant='danger' className='mb-0'>{props.error}</Alert>}
                {isFieldsError && <Alert variant='danger' className='mb-0'>Please, fill all the fields to login.</Alert>}

                <Button
                    variant="outline-dark"
                    onClick={onLogin}
                    type='submit'
                    className='m-auto'
                    style={{ width: '100%'}}
                    disabled={props.isLoginPending}
                >
                    {props.isLoginPending ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
}