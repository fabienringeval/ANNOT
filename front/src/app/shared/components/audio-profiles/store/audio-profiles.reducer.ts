import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList,
    emptyProfileList
} from './audio-profiles.actions';
import { Profile } from 'src/app/shared/models';
import { AudioProfilesState, initialState } from './audio-profiles.state';

export const AudioProfilesFeatureName = 'loadUserList';

const AudioProfilesReducer = createReducer(
    initialState,
    on(loadingProfileList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingProfileList, (state, { profiles }: { profiles: Profile[] }) => ({
        ...state,
        profiles,
        inProgress: false,
        done: true
    })),
    on(errorLoadingProfileList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyProfileList, (state) => ({
        ...state,
        users: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: AudioProfilesState | undefined, action: Action) {
    return AudioProfilesReducer(state, action);
}
