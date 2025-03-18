import * as fromRoot from 'src/app/core/store';
import { TimeInterval } from 'src/app/shared/models';

export const featureName = 'loadTimeIntervalList';

export interface LoadTimeIntervalListState {
    timeIntervals: TimeInterval[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadTimeIntervalListState;
}

export const initialState: LoadTimeIntervalListState = {
    timeIntervals: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
