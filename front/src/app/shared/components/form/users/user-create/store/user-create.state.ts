import * as fromRoot from 'src/app/core/store';
import { Emotion, TimeInterval, User } from 'src/app/shared/models';

export const featureName = 'userCreate';

export interface UserCreateState {
    emotionList: {
        emotions: Emotion[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    companyList: {
        companies: Emotion[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    timeIntervalList: {
        timeIntervals: TimeInterval[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    user: {
        user: User;
        inProgress: boolean;
        done: boolean;
        error: any;
    }
}

export interface State extends fromRoot.State {
    [featureName]: UserCreateState;
}

export const initialState: UserCreateState = {
    emotionList: {
        emotions: null,
        inProgress: false,
        done: false,
        error: null
    },
    companyList: {
        companies: null,
        inProgress: false,
        done: false,
        error: null
    },
    timeIntervalList: {
        timeIntervals: null,
        inProgress: false,
        done: false,
        error: null
    },
    user: {
        user: null,
        inProgress: false,
        done: false,
        error: null
    }
};
