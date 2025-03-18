import * as fromRoot from 'src/app/core/store';
import { Audio } from 'src/app/shared/models';

export const featureName = 'loadAudioList';

export interface LoadAudioListState {
    audios: Audio[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadAudioListState;
}

export const initialState: LoadAudioListState = {
    audios: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
