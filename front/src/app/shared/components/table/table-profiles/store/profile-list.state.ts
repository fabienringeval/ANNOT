import * as fromRoot from 'src/app/core/store';
import { Profile } from 'src/app/shared/models';

export const featureName = 'loadProfileList';

export interface LoadProfileListState {
    profiles: Profile[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadProfileListState;
}

export const initialState: LoadProfileListState = {
    profiles: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
