import * as fromRoot from 'src/app/core/store';
import { TimeInterval } from 'src/app/shared/models';

export const featureName = 'timeIntervalCreate';

export interface TimeIntervalCreateState {
    timeInterval: TimeInterval;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: TimeIntervalCreateState;
}

export const initialState: TimeIntervalCreateState = {
    timeInterval: null,
    inProgress: false,
    done: false,
    error: null
};
