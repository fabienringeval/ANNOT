import { Action, createReducer, on } from '@ngrx/store';
import {
    successLoadingRole, errorLoadingRole, reset
} from './role.actions';
import { State, initialState } from './role.state';

export const rolesFeatureName = 'roles';

const authReducer = createReducer(
    initialState,
    on(successLoadingRole, (state, { roles, modules }) => {
        return ({
            ...state,
            roles,
            modules,
            granted: Boolean(roles)
        })
    }),
    on(errorLoadingRole, (state, { error }) => ({
        ...state,
        error
    })),
    on(reset, (state) => ({
        ...state,
        roles: null,
        modules: null,
        granted: false,
        error: null
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
