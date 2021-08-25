/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Page header handle module.
 *
 */

import { VpnKey, ExitToApp, AccountBox } from '@material-ui/icons';

import './header.scss';

function Logo(props) {
    return (
        <div className='headerItem'>
        </div>
    );
}

function Brand(props) {
    return (
        <div className='headerItem'>
        </div>
    );
}

function UserGreeting(props) {
    return (
        <div className='greetings fogged' >
            Добро пожаловать,<AccountBox />{props.userName}!
        </div>
    );
}

function UserActions(props) {
    const LoginButton = 
        <button className='actionButton'>
            <VpnKey />
            <p>Войти</p>    
        </button>
    const LogoutButton = 
        <button className='actionButton'>
            <ExitToApp />
            <p>Выйти</p>    
        </button>
    const Action = props.isLoggedIn ? LogoutButton : LoginButton;

    return (Action);
}

// Application main component
export default function HeaderView(props) {
    return (
        <div className='header'>
            <UserActions isLoggedIn={props.isLoggedIn} userLogout={props.userLogout} />
            {props.isLoggedIn && <UserGreeting userName={props.userName} />}
            <Logo />
            <Brand />
        </div>
    );
}