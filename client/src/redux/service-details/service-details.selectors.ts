import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectServiceDetails = (state: StoreState) => state.serviceDetails;

export const selectServiceItem = createSelector(
    [selectServiceDetails],
    (serviceDetails) => serviceDetails.serviceItem
)