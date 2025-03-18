import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    creatingProfile,
    successCreatingProfile,
    errorCreatingProfile
} from './profile-create.actions';
import { Profile } from 'src/app/shared/models';
import { ProfileCreateState, initialState } from './profile-create.state';

export const loadProfileListFeatureName = 'loadProfileList';

const createProfileReducer = createReducer(
    initialState,
    on(creatingProfile, (state) => ({
        ...state,
        inProgress: true,
        done: false,
        error: null
    })),
    on(successCreatingProfile, (state, { profile }: { profile: Profile }) => ({
        ...state,
        profile,
        inProgress: false,
        done: true
    })),
    on(errorCreatingProfile, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: ProfileCreateState | undefined, action: Action) {
    return createProfileReducer(state, action);
}
