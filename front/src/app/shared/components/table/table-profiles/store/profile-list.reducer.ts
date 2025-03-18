import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList,
    emptyProfileList
} from './profile-list.actions';
import { Profile } from 'src/app/shared/models';
import { LoadProfileListState, initialState } from './profile-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingProfileList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingProfileList, (state, { profiles, total }: { profiles: Profile[], total: number }) => ({
        ...state,
        profiles,
        total,
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
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadProfileListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
