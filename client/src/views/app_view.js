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

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {SnackbarProvider} from "notistack";

import "./mui_custom.scss";
import InstallPWA from "./common/PWA_install_bar";
import Header from '../controllers/common/header_controller';
import NotificationView from "../controllers/common/notification_controller";

// Application pages routes
const pagesRoutes = [
    { path: '/authorization',  isHeader: false, Component: React.lazy(() => import('../views/authorization/auth_form')) },
    { path: '/admin',          isHeader: false, Component: React.lazy(() => import('../controllers/books/admin_books_creation_controller')) },
    { path: '/reader/:bookId', isHeader: false, Component: React.lazy(() => import('../controllers/reader/reader_controller')) },
    { path: '/',               isHeader: true,  Component: React.lazy(() => import('../controllers/books/books_page_controller')) },
];

// Application main component
export default function AppView(props) {
    useEffect(() => {
        window.addEventListener('offline', props.goOffline);
        window.addEventListener('online', props.goOnline);

        return () => {
            window.removeEventListener('offline', props.goOffline);
            window.removeEventListener('online', props.goOnline);
        }
    }, [props.goOffline, props.goOnline]);

    const reLogin = props.userReLogin;
    useEffect(reLogin, [reLogin]);

    return (
        <Router>
            <InstallPWA />
            <SnackbarProvider>
                <NotificationView />
            </SnackbarProvider>

            <React.Suspense fallback={<h1>Loading</h1>}>
            <Switch>
                {pagesRoutes.map(({path, isHeader, Component}) =>
                    <Route
                        key={path}
                        exact path={path}
                        render={() => <>
                                {isHeader && <Header />}
                                <Component className='page'/>
                            </>
                        }
                    />
                )}
            </Switch>
            </React.Suspense>
        </Router>
    );
}