import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectCart = (state: StoreState) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.itemsInCart
);

export const selectTotalPrice = createSelector(
    [selectCart],
    (cart) => cart.totalPrice
)
