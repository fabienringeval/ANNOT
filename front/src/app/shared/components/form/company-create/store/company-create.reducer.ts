import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    creatingCompany,
    successCreatingCompany,
    errorCreatingCompany
} from './company-create.actions';
import { Company } from 'src/app/shared/models';
import { CompanyCreateState, initialState } from './company-create.state';

export const loadCompanyListFeatureName = 'loadCompanyList';

const createCompanyReducer = createReducer(
    initialState,
    on(creatingCompany, (state) => ({
        ...state,
        timeIntervals: null,
        inProgress: true,
        done: false
    })),
    on(successCreatingCompany, (state, { company }: { company: Company }) => ({
        ...state,
        company,
        inProgress: false,
        done: true
    })),
    on(errorCreatingCompany, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: CompanyCreateState | undefined, action: Action) {
    return createCompanyReducer(state, action);
}
