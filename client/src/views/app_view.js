/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Main application component view handle.
 *
 */

import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.scss'
import {IconButton, Snackbar} from "@material-ui/core";
import {GetApp, Close} from '@material-ui/icons';

// Application pages routes
const pagesRoutes = [
    { path: '/authorization', Component: React.lazy(() => import('./authorization/auth_form')) },
    { path: '/admin',         Component: React.lazy(() => import('../controllers/books/admin_books_creation_controller')) },
    { path: '/',              Component: React.lazy(() => import('../controllers/books/books_page_controller')) },
];

let deferredPrompt;

// Application main component
export default function AppView(props) {
    const reLogin = props.userReLogin;

    const [installable, setInstallable] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            setInstallable(true);
            setOpen(true);

            console.log(open);
            console.log(installable);
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
        });

        reLogin();
    }, [reLogin]);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    };

    const handleInstallClick = (e) => {
        // Hide the app provided install promotion
        setInstallable(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    };
    console.log(open);
    console.log(installable);
    return (
        <Router>
            {<Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open && installable}
                autoHideDuration={6000}
                onClose={handleClose}
                message="You can install an application to use it offline!"
                action={
                    <Fragment>
                        <IconButton
                            aria-label="install"
                            onClick={() => {
                                handleInstallClick();
                                handleClose('install', 'success');
                            }}>Install
                            <GetApp />
                        </IconButton>
                        <IconButton
                            aria-label="close"
                            onClick={() => {
                                handleClose('close', 'later');
                            }}>
                            <Close />
                        </IconButton>
                    </Fragment>
                }
            />}

            <React.Suspense fallback={<h1>Loading</h1>}>
            <Switch>
                {pagesRoutes.map(({path, Component}) =>
                    <Route
                        key={path}
                        exact path={path}
                        render={() => <Component className='page'/>}
                    />
                )}
            </Switch>
            </React.Suspense>

            {/* Footer */}
        </Router>
    );
}