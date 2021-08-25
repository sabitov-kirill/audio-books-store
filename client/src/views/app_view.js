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

import React,  { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InstallPWA from "./PWA_install_bar";

import './app.scss'
import Header from '../controllers/common/header_controller';
import {GlobalCss} from "./cool_css";

// Application pages routes
const pagesRoutes = [
    { path: '/authorization', isHeader: false, Component: React.lazy(() => import('./authorization/auth_form')) },
    { path: '/admin',         isHeader: false, Component: React.lazy(() => import('../controllers/books/admin_books_creation_controller')) },
    { path: '/',              isHeader: true,  Component: React.lazy(() => import('../controllers/books/books_page_controller')) },
];

// Application main component
export default function AppView(props) {
    const reLogin = props.userReLogin;
    useEffect(() => reLogin(), [reLogin]);

    return (
        <Router>
            <GlobalCss />
            <InstallPWA />
            {}

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