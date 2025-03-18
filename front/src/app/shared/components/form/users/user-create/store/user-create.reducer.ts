import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingCompanyList,
    successLoadingCompanyList,
    errorLoadingCompanyList,
    creatingUser,
    successCreatingUser,
    errorCreatingUser
} from './user-create.actions';
import { Company, User } from 'src/app/shared/models';
import { UserCreateState, initialState } from './user-create.state';

export const loadUserListFeatureName = 'loadUserList';

const createUserReducer = createReducer(
    initialState,
    on(loadingCompanyList, (state) => ({
        ...state,
        companyList: {
            ...state.companyList,
            companies: null,
            inProgress: true
        }
    })),
    on(successLoadingCompanyList, (state, { companies }: { companies: Company[] }) => ({
        ...state,
        companyList: {
            ...state.companyList,
            companies,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingCompanyList, (state, { error }: { error: any }) => ({
        ...state,
        companyList: {
            ...state.companyList,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(creatingUser, (state) => ({
        ...state,
        user: {
            ...state.user,
            timeIntervals: null,
            inProgress: true
        }
    })),
    on(successCreatingUser, (state, { user }: { user: User }) => ({
        ...state,
        user: {
            ...state.user,
            user,
            inProgress: false,
            done: true
        }
    })),
    on(errorCreatingUser, (state, { error }: { error: any }) => ({
        ...state,
        user: {
            ...state.user,
            inProgress: false,
            done: false,
            error
        }
    }))
);

export function reducer(state: UserCreateState | undefined, action: Action) {
    return createUserReducer(state, action);
}
