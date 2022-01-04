import { IFileWithMeta } from 'react-dropzone-uploader';

export enum OnboardingActionTypes {
    ADD_PROFILE_IMAGE = 'ADD_PROFILE_IMAGE',
    CLEAR_PROFILE_IMAGE = 'CLEAR_PROFILE_IMAGE'
}

export interface DroppedFile {
    fileWithMeta: IFileWithMeta;
    fileObject?: any;
}

export interface OnboardingState {
    profileImage: DroppedFile | null;
}