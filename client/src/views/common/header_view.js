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
import { useHistory } from 'react-router-dom';

import './header.scss';

function Logo(props) {
    return (
        <img alt='logo' className='logo' src='/images/logo.svg' />
    );
}

function UserGreeting(props) {
    return (
        <div className='greetings fogged' >
            <p className='extra'>Добро пожаловать,</p>
            <AccountBox />{props.userName}
            <p className='extra'>!</p>
        </div>
    );
}

function UserActions(props) {
    const history = useHistory();
    const redirectToLogin = () => {
        history.push('/authorization');
    }

    const LoginButton = 
        <button className='actionButton' onClick={redirectToLogin} >
            <VpnKey />
            <p className='actionButtonText'>Войти</p>   
        </button>
    const LogoutButton = 
        <button className='actionButton' onClick={(e) => {
            if (props.isOffline)
                props.offlineLogout();
            else
                props.userLogout(e);
            }}
        >
            <ExitToApp />
            <p className='actionButtonText'>Выйти</p>    
        </button>
    const Action = props.isLoggedIn ? LogoutButton : LoginButton;

    return (Action);
}

// Application main component
export default function HeaderView(props) {
    return (
        <div className='header'>
            <UserActions isLoggedIn={props.isLoggedIn} userLogout={props.userLogout} isOffline={props.isOffline} offlineLogout={props.offlineLogout} />
            {props.isLoggedIn && <UserGreeting userName={props.userName} />}
            <Logo />
        </div>
    );
}