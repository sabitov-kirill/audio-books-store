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
 import './auth.scss';
 
 // Component to render if login sign in selected
 function LoginForm(props) {
     return (
        <div className='d-flex flex-column justify-content-center'>
            <h1 className='mx-auto my-5'>Sign In</h1>
            <div style={props.formStyle}>
                <LoginFormController />
            </div>
            <p className='mx-auto'>
                Don' have account yet?
                <button
                    type="button"
                    className="btn btn-link m-0 p-0 ps-1"
                    onClick={props.onSetRegistr}
                    style={{color: 'gray'}}
                >Sign Up!</button>
            </p>
        </div>
     );
 }
 
 // Component to render if login sign up selected
 function RegistrForm(props) {
     return (
         <div className='d-flex flex-column justify-content-center'>
             <h1 className='mx-auto my-5'>Sign Up</h1>
             <div style={props.formStyle}>
                 <RegistrationFormController />
             </div>
             <p className='mx-auto'>
                 Already have an account?
                 <button
                     type="button"
                     className="btn btn-link m-0 p-0 ps-1"
                     onClick={props.onSetLogin}
                     style={{color: 'gray'}}
                 >Sign In!</button>
             </p>
         </div>
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
     const onSetRegistr = () => {
         setIsLoginForm(false);
     }
 
     // Background image style
     const formStyle = {
         width: '400px',
         margin: '0 auto',
         backgroundColor: 'lightgray',
         borderRadius: '10px',
     }
 
     return isLoginForm
         ? <LoginForm formStyle={formStyle} onSetRegistr={onSetRegistr} /> 
         : <RegistrForm  formStyle={formStyle} onSetLogin={onSetLogin} />;
 }