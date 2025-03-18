import * as fromRoot from 'src/app/core/store';

export const featureName = 'topUserList';

export interface TopUserState {
    firstName: string;
    lastName: string;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: TopUserState;
}

export const initialState: TopUserState = {
    firstName: null,
    lastName: null,
    inProgress: false,
    done: false,
    error: null
};
