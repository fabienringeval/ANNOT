import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    deletingTimeInterval,
    successDeletingTimeInterval,
    errorDeletingTimeInterval
} from './delete-time-interval.actions';
import { DeleteButtonState, initialState } from './delete-time-interval.state';

export const deleteTimeIntervalButtonFeatureName = 'deleteTimeIntervalButton';

const DeleteButtonReducer = createReducer(
    initialState,
    on(deletingTimeInterval, (state) => ({
        ...state,
        inProgress: true,
        done: false
    })),
    on(successDeletingTimeInterval, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorDeletingTimeInterval, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: DeleteButtonState | undefined, action: Action) {
    return DeleteButtonReducer(state, action);
}
