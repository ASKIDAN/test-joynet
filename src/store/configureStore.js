import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import AppReducers from '../reducers';


const configureStore = (initialState) => {
    const logger = createLogger();
    const store = createStore(AppReducers, initialState, applyMiddleware(thunk, logger));

    return store;
};

export default configureStore;