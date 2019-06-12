// @flow

import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";


// App Reducer
import {appReducer} from "../App/App.reducer";

/**
 * Create and export REDUX STORE
 * @type {Store<any & any> & any}
 */
export const store = createStore(
    // Combined reducers
    combineReducers({
        // Application Core
        app: appReducer,
    }),
    // Compose middleware
    compose(
        composeWithDevTools(
        applyMiddleware(thunkMiddleware)
        )
    )
);

export const dispatcher = store.dispatch;