import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

export const history = createBrowserHistory()

export const rootConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['modal']
};

export const store = createStore(
    rootReducer(history),
    applyMiddleware(thunk, logger, routerMiddleware(history))
);

export const persistedStore = persistStore(store);