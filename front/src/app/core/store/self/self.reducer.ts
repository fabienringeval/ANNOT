import { Action, createReducer, on } from '@ngrx/store';

import {
    loadingUser,
    successLoadingUser,
    errorLoadingUser,
    reset
} from './self.actions';
import { State, initialState } from './self.state';
import { User } from 'src/app/shared/models';

const selfReducer = createReducer(
    initialState,
    on(loadingUser, (state) => ({
        ...state,
        user: null,
        done: false,
        inProgress: true,
        error: null
    })),
    on(successLoadingUser, (state, { user }: { user: User }) => ({
        ...state,
        user,
        done: true,
        inProgress: false
    })),
    on(errorLoadingUser, (state, { error }: { error: any }) => ({
        ...state,
        user: null,
        inProgress: false,
        error
    })),
    on(reset, (state) => ({
        ...state,
        user: null,
        selectedCorpus: null,
        selectedProject: null
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return selfReducer(state, action);
}
