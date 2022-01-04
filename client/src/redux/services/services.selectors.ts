import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectServices = (state: StoreState) => state.services;

export const selectServiceImage = createSelector(
    [selectServices],
    (services) => services.serviceImage
)