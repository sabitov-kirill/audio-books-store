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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Application pages routes
const pagesRoutes = [
    { path: '/login', Component: React.lazy(() => import('../controllers/user/login_form_controller')) },
    { path: '/reg', Component: React.lazy(() => import('../controllers/user/registration-form-controller')) },
    { path: '/auth', Component: React.lazy(() => import('../views/user/auth_form_view')) },
    { path: '/', Component: React.lazy(() => import('../views/books/main_page')) },
];

// Application main component
export default function App() {
    return (
        <Router>
            {/* Header */}

            <React.Suspense fallback={<h1>Loading</h1>}>
            <Switch>
                {pagesRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} />
                )}
            </Switch>
            </React.Suspense>

            {/* Footer */}
        </Router>
    );
}