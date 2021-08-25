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

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.scss'
import Header from '../controllers/common/header_controller';

// Application pages routes
const pagesRoutes = [
    { path: '/authorization', isHeader: false, Component: React.lazy(() => import('./authorization/auth_form')) },
    { path: '/admin',         isHeader: false, Component: React.lazy(() => import('../controllers/books/admin_books_creation_controller')) },
    { path: '/',              isHeader: true,  Component: React.lazy(() => import('../controllers/books/books_page_controller')) },
];

let deferredPrompt;

// Application main component
export default function AppView(props) {
    return (
        <Router>
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