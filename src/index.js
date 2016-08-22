import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk';
import promise from "redux-promise";

import App from './components/app';
import reducers from './reducers';

require('./scss/scotty');

import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


//devToolsExtension
const initialState = {};

let store = createStore(reducers, initialState, compose(
    applyMiddleware(promise, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    //<Provider store={createStoreWithMiddleware(reducers)}>
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
, document.querySelector('#root'));
