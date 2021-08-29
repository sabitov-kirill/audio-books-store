/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Application enter point.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App, { store } from './controllers/app_controller';

// Rendering main component witch store provider.
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();