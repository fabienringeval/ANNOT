import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingUserInfo,
    successLoadingUserInfo,
    errorLoadingUserInfo
} from './top-user.actions';
import { TopUserState, initialState } from './top-user.state';

const topUserReducer = createReducer(
    initialState,
    on(loadingUserInfo, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingUserInfo, (state, { firstName, lastName }: { firstName: string, lastName: string }) => ({
        ...state,
        firstName,
        lastName,
        inProgress: false,
        done: true
    })),
    on(errorLoadingUserInfo, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    }))
);

export function reducer(state: TopUserState | undefined, action: Action) {
    return topUserReducer(state, action);
}
