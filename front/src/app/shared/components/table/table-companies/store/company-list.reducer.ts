import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingCompanyList,
    successLoadingCompanyList,
    errorLoadingCompanyList,
    emptyCompanyList
} from './company-list.actions';
import { Company } from 'src/app/shared/models';
import { LoadCompanyListState, initialState } from './company-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingCompanyList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingCompanyList, (state, { companies, total }: { companies: Company[], total: number }) => ({
        ...state,
        companies,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingCompanyList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyCompanyList, (state) => ({
        ...state,
        users: null,
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadCompanyListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
