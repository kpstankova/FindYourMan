import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectModal = (state: StoreState) => state.modal;

export const selectLoginModal = createSelector(
    [selectModal],
    (modal) => modal.toggleLoginModal
)

export const selectRegisterModal = createSelector (
    [selectModal],
    (modal) => modal.toggleRegisterModal
)

export const selectRegisterAsRoleModal = createSelector (
    [selectModal],
    (modal) => modal.toggleRegisterAsRoleModal
)

export const selectForgotPasswordModal = createSelector (
    [selectModal],
    (modal) => modal.toggleForgotPasswordModal
)

export const selectContactUsModal = createSelector (
    [selectModal],
    (modal) => modal.toggleContactUsModal
)
