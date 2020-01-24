import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import {BrowserRouter, Route} from 'react-router-dom';
import {composeWithDevTools} from "redux-devtools-extension";

import './index.css';
import App from './App';
import Album from './components/Album';
import Gallery from './components/Gallery';
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers'
import loggerMiddleware from './middleware/logger'
import monitorReducerEnhancer from './enhancers/monitorReducer'

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const composedEnhancers = composeWithDevTools(
    middlewareEnhancer,
    monitorReducerEnhancer
);

const store = createStore(rootReducer, undefined, composedEnhancers)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={Gallery}/>
                <Route path="/album" component={Album}/>
            </App>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
