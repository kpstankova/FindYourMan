import { DroppedFile, OnboardingActionTypes } from "./onboarding.types";

export interface IOnboardingBaseAction {
    type: OnboardingActionTypes;
}

export interface IAddProfileImage extends IOnboardingBaseAction {
    type: OnboardingActionTypes.ADD_PROFILE_IMAGE;
    data: DroppedFile;
}

export type TOnboardingReducerAction = IAddProfileImage;