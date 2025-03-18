import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    deletingCompany,
    successDeletingCompany,
    errorDeletingCompany
} from './delete-company.actions';
import { DeleteButtonState, initialState } from './delete-company.state';

export const deleteCompanyButtonFeatureName = 'deleteCompanyButton';

const DeleteButtonReducer = createReducer(
    initialState,
    on(deletingCompany, (state) => ({
        ...state,
        inProgress: true,
        done: false
    })),
    on(successDeletingCompany, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorDeletingCompany, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: DeleteButtonState | undefined, action: Action) {
    return DeleteButtonReducer(state, action);
}
