import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectOnboarding = (state: StoreState) => state.onboarding;

export const selectProfileImage = createSelector(
    [selectOnboarding],
    (onboarding) => onboarding.profileImage
)