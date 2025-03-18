import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingUserList,
    successLoadingUserList,
    errorLoadingUserList,
    emptyUserList
} from './user-list.actions';
import { User } from 'src/app/shared/models';
import { LoadUserListState, initialState } from './user-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingUserList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingUserList, (state, { users, total }: { users: User[], total: number }) => ({
        ...state,
        users,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingUserList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyUserList, (state) => ({
        ...state,
        users: null,
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadUserListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
