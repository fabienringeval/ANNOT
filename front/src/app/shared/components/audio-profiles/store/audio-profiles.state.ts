import * as fromRoot from 'src/app/core/store';
import { Profile } from 'src/app/shared/models';

export const featureName = 'audioProfiles';

export interface AudioProfilesState {
    profiles: Profile[];
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: AudioProfilesState;
}

export const initialState: AudioProfilesState = {
    profiles: null,
    inProgress: false,
    done: false,
    error: null
};
