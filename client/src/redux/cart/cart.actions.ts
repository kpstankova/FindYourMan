import { ServiceItem } from "../../components/services-page/my-services.types";
import { CartActionTypes } from "./cart.types";

export interface ICartBaseAction {
    type: CartActionTypes;
}

export interface IAddToCart extends ICartBaseAction {
    type: CartActionTypes.ADD_TO_CART;
    data: ServiceItem;
}

export interface IRemoveFromCart extends ICartBaseAction {
    type: CartActionTypes.REMOVE_FROM_CART;
    data: number;
}

export interface IClearCart extends ICartBaseAction {
    type: CartActionTypes.CLEAR_CART;
}

export type TCartReducerActions = IAddToCart | IRemoveFromCart | IClearCart;