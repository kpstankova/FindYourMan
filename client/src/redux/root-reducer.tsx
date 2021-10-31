import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import modalReducer from './modal-visibility/modal.reducer';
import { ModalState } from './modal-visibility/modal.types';

export interface StoreState {
    router: RouterState;
    modal: ModalState;
};

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: connectRouter(history),
    modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;