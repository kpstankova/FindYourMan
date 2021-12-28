import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectUser = (state: StoreState) => state.user;

export const selectRegisterRole = createSelector (
    [selectUser],
    (user) => user.registerRole
)

export const selectCurrentUser = createSelector (
    [selectUser],
    (user) => user.currentUser
)