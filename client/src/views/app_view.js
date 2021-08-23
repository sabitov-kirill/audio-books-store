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

import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Application pages routes
const pagesRoutes = [
    { path: '/login', Component: React.lazy(() => import('../controllers/user/login_form_controller')) },
    { path: '/reg', Component: React.lazy(() =>   import('../controllers/user/registration_form_controller')) },
    { path: '/auth', Component: React.lazy(() =>  import('./user/auth_form')) },
    { path: '/admin', Component: React.lazy(() => import('../controllers/books/admin_books_creation_controller')) },
    { path: '/', Component: React.lazy(() =>      import('../controllers/books/books_page_controller')) },
];

// Application main component
export default function AppView(props) {
    useEffect(() => {
        const userReLoginCall = async () => await props.userReLogin();
        userReLoginCall().then();
    }, [props]);

    return (
        <Router>
            {/* Header */}

            <React.Suspense fallback={<h1>Loading</h1>}>
            <Switch>
                {pagesRoutes.map(({path, Component}) =>
                    <Route key={path} exact path={path} render={() => <Component />} />
                )}
            </Switch>
            </React.Suspense>

            {/* Footer */}
        </Router>
    );
}