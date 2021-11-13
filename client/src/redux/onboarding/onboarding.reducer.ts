import { TOnboardingReducerAction } from "./onboarding.actions";
import { OnboardingActionTypes, OnboardingState } from "./onboarding.types";

const InitialState: OnboardingState = {
    profileImage: null
}

export const onboardingReducer = (state = InitialState, action: TOnboardingReducerAction): OnboardingState => {
    switch (action.type) {
        case OnboardingActionTypes.ADD_PROFILE_IMAGE: {
            return {
                ...state,
                profileImage: action.data
            }
        }
        default:
            return state;
    }
}