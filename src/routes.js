import React from 'react';

import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

//Component
import App from './app';

let Routes =  (
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
);
export default Routes;
