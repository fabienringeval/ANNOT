import { Action, createReducer, on } from '@ngrx/store';

import {
    logging,
    successSavingTokens,
    errorSavingTokens
} from './auth.actions';
import { State, initialState } from './auth.state';

const authReducer = createReducer(
    initialState,
    on(logging, (state) => ({
        ...state,
        accessToken: null,
        refreshToken: null,
        logged: false,
        done: false,
        inProgress: true,
        error: null
    })),
    on(successSavingTokens, (state, { refresh_token, access_token }: { refresh_token: string, access_token: string }) => ({
        ...state,
        accessToken: access_token,
        refreshToken: refresh_token,
        logged: true,
        inProgress: false
    })),
    on(errorSavingTokens, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
