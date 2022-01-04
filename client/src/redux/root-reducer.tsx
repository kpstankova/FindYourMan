import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import modalReducer from './modal-visibility/modal.reducer';
import { ModalState } from './modal-visibility/modal.types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { onboardingReducer } from './onboarding/onboarding.reducer';
import { OnboardingState } from './onboarding/onboarding.types';
import { UserState } from './user/user.types';
import userReducer from './user/user.reducer';
import { ServiceDetailsState } from './service-details/service-details.types';
import { serviceDetailsReducer } from './service-details/service-details.reducer';
import { ServicesState } from './services/services.types';
import { servicesReducer } from './services/services.reducer';
import { CartState } from './cart/cart.types';
import { cartReducer } from './cart/cart.reducer';

export interface StoreState {
    router: RouterState & PersistPartial;
    modal: ModalState;
    onboarding: OnboardingState;
    user: UserState & PersistPartial;
    serviceDetails: ServiceDetailsState & PersistPartial;
    services: ServicesState;
    cart: CartState & PersistPartial;
};

const routerConfig = {
    key: 'router',
    storage: storage,
}

const userConfig = {
    key: 'user',
    storage: storage,
}

const serviceDetailsConfig = {
    key: "serviceDetails",
    storage: storage
}

const cartConfig = {
    key: "cart",
    storage: storage
}

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: persistReducer(routerConfig, connectRouter(history)),
    modal: modalReducer,
    onboarding: onboardingReducer,
    user: persistReducer(userConfig, userReducer),
    serviceDetails: persistReducer(serviceDetailsConfig, serviceDetailsReducer),
    services: servicesReducer,
    cart: persistReducer(cartConfig, cartReducer)
});

export type RootState = ReturnType<typeof rootReducer>;