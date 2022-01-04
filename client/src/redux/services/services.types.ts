import { DroppedFile } from '../onboarding/onboarding.types';

export enum ServicesActionTypes {
    ADD_SERVICE_IMAGE = 'ADD_SERVICE_IMAGE',
    CLEAR_SERVICE_IMAGE = 'CLEAR_SERVICE_IMAGE'
}

export interface ServicesState {
    serviceImage: DroppedFile | null;
}