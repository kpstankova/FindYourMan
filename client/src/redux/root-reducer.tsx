import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import modalReducer from './modal-visibility/modal.reducer';
import { ModalState } from './modal-visibility/modal.types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export interface StoreState {
    router: RouterState & PersistPartial;
    modal: ModalState;
};

const routerConfig = {
    key: 'router',
    storage: storage,
    whitelist: ['router']
}

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: persistReducer(routerConfig, connectRouter(history)),
    modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;