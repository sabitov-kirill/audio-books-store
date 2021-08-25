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
import Header from '../controllers/common/header_controller'
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
    return (
        <Router>
            <Header />

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
        </Router>
    );
}