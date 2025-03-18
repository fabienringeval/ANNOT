import * as fromRoot from 'src/app/core/store';
import { Audio } from 'src/app/shared/models';

export const featureName = 'audioList';

export interface AudioAnnotationState {
    audioList: Audio[];
    totalAudios: number;
    loading: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: State;
}

export const initialState: AudioAnnotationState = {
    audioList: null,
    totalAudios: null,
    loading: false,
    done: false,
    error: null
};
