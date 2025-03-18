import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    deletingProfile,
    successDeletingProfile,
    errorDeletingProfile
} from './delete-profile.actions';
import { DeleteButtonState, initialState } from './delete-profile.state';

export const deleteProfileButtonFeatureName = 'deleteProfileButton';

const DeleteButtonReducer = createReducer(
    initialState,
    on(deletingProfile, (state) => ({
        ...state,
        inProgress: true,
        done: false
    })),
    on(successDeletingProfile, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorDeletingProfile, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: DeleteButtonState | undefined, action: Action) {
    return DeleteButtonReducer(state, action);
}
