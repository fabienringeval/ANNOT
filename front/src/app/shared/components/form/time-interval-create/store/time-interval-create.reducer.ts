import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    creatingTimeInterval,
    successCreatingTimeInterval,
    errorCreatingTimeInterval
} from './time-interval-create.actions';
import { TimeInterval } from 'src/app/shared/models';
import { TimeIntervalCreateState, initialState } from './time-interval-create.state';

export const loadTimeIntervalListFeatureName = 'loadTimeIntervalList';

const createTimeIntervalReducer = createReducer(
    initialState,
    on(creatingTimeInterval, (state) => ({
        ...state,
        timeInterval: null,
        inProgress: true,
        done: false
    })),
    on(successCreatingTimeInterval, (state, { timeInterval }: { timeInterval: TimeInterval }) => ({
        ...state,
        timeInterval,
        inProgress: false,
        done: true
    })),
    on(errorCreatingTimeInterval, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: TimeIntervalCreateState | undefined, action: Action) {
    return createTimeIntervalReducer(state, action);
}
