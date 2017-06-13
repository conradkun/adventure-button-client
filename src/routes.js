import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

//Component
import App from './app';

let Routes =  (
    <I18nextProvider i18n={ i18n }>
        <Router>
            <Switch>
              <Route path='/test'render={(props) => (
                <b>Test</b>
              )}/>
              <Route path='/' render={(props) => (
                <App {...props}/>
              )}/>
            </Switch>
        </Router>
    </I18nextProvider>
);
export default Routes;
