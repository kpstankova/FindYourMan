import { ServiceItem } from "../../components/services-page/my-services.types";
import { TCartReducerActions } from "./cart.actions";
import { addToCart, removeFromCart } from "./cart.functions";
import { CartActionTypes, CartState } from "./cart.types";

const InitialState: CartState = {
    itemsInCart: [], 
    totalPrice: 0
};

export const cartReducer = (state = InitialState, action: TCartReducerActions): CartState => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART: {
            return { 
                ...state,
                itemsInCart: addToCart(state.itemsInCart, action.data),
                totalPrice: state.totalPrice + action.data.price 
            }
        }
        case CartActionTypes.REMOVE_FROM_CART: {
            return { 
                ...state,
                itemsInCart: state.itemsInCart.filter((item: ServiceItem) => item.service_id !== action.data),
                totalPrice: removeFromCart(state.itemsInCart, action.data, state.totalPrice)
            }
        }
        case CartActionTypes.CLEAR_CART: {
            return { 
                ...state,
                itemsInCart: [],
                totalPrice: 0
            }
        }
        default:
            return state;
    }
}