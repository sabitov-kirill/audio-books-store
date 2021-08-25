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
import {Box, Grid, Link} from "@material-ui/core";
 
// Component to render if login sign in selected
function LoginForm(props) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
           <h1>Sign In</h1>
           <div style={props.formStyle}>
               <LoginFormController />
           </div>
           <p style={{textAlign: "center"}}>
               Don' have account yet?
               <Link
                   onClick={props.onSetRegister}
                   color="inherit"
               >Sign Up!</Link>
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
             <h1>Sign In</h1>
             <div style={props.formStyle}>
                 <RegistrationFormController />
             </div>
             <p style={{textAlign: "center"}}>
                 Don' have account yet?
                 <Link
                     onClick={props.onSetLogin}
                     color="inherit"
                 >Sign In!</Link>
             </p>
         </Grid>
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
     const onSetRegister = () => {
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
         ? <LoginForm formStyle={formStyle} onSetRegister={onSetRegister} />
         : <RegisterForm  formStyle={formStyle} onSetLogin={onSetLogin} />;
 }