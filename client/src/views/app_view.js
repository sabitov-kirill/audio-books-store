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

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.scss'

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
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            setInstallable(true);
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
        });

        reLogin();
    }, [reLogin]);

    const [installable, setInstallable] = useState(false);

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

    return (
        <Router>
            {installable &&
            <button className="install-button" onClick={handleInstallClick}>
                INSTALL ME
            </button>}

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