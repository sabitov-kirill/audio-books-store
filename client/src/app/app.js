/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Main application component handle.
 *
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginForm from "../controllers/user/login_form_controller";
import BookList from "../controllers/books/books_controller";

// Application pages routes
const pagesRoutes = [
    { path: '/login', Component: LoginForm },
    { path: '/', Component: BookList },
];

// Application main component
export default function App() {
    return (
        <Router>
            {/* Header */}

            <Switch>
                {pagesRoutes.map(({path, Component}) =>
                    <Route key={path} path={path}>
                        <Component />
                    </Route>
                )}
            </Switch>

            {/* Footer */}
        </Router>
    );
}