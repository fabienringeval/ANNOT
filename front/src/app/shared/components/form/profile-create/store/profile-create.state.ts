import * as fromRoot from 'src/app/core/store';
import { Profile } from 'src/app/shared/models';

export const featureName = 'profileCreate';

export interface ProfileCreateState {
    profile: Profile;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: ProfileCreateState;
}

export const initialState: ProfileCreateState = {
    profile: null,
    inProgress: false,
    done: false,
    error: null
};
