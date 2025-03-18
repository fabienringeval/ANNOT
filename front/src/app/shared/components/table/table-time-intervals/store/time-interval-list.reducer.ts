import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingTimeIntervalList,
    successLoadingTimeIntervalList,
    errorLoadingTimeIntervalList,
    emptyTimeIntervalList
} from './time-interval-list.actions';
import { TimeInterval } from 'src/app/shared/models';
import { LoadTimeIntervalListState, initialState } from './time-interval-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingTimeIntervalList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingTimeIntervalList, (state, { timeIntervals, total }: { timeIntervals: TimeInterval[], total: number }) => ({
        ...state,
        timeIntervals,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingTimeIntervalList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyTimeIntervalList, (state) => ({
        ...state,
        users: null,
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadTimeIntervalListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
