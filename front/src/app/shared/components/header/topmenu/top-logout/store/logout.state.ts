import * as fromRoot from 'src/app/core/store';
import { Emotion, TimeInterval, Campaign } from 'src/app/shared/models';

export const featureName = 'logout';

export interface LogoutState {
    loggingOut: boolean;
    loggedOut: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LogoutState;
}

export const initialState: LogoutState = {
    loggingOut: false,
    loggedOut: false,
    error: null
};
