
import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loggingOut,
    successLoggingOut,
    errorLoggingOut,
    removingTokens
} from './logout.actions';
import { LogoutState, initialState } from './logout.state';

const logoutReducer = createReducer(
    initialState,
    on(loggingOut, (state) => ({
        ...state,
        loggedOut: false
    })), 
    on(successLoggingOut, (state) => ({
        ...state,
        loggedOut: true
    })),
    on(errorLoggingOut, (state) => ({
        ...state
    })),
    on(removingTokens, (state) => ({
        ...state,
        loggedOut: false
    }))
    
);

export function reducer(state: LogoutState | undefined, action: Action) {
    return logoutReducer(state, action);
}
