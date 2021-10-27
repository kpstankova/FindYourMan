import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';

export interface StoreState {
    router: RouterState;
};

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: connectRouter(history)
});

export type RootState = ReturnType<typeof rootReducer>;