import * as fromRoot from 'src/app/core/store';
import { Emotion } from 'src/app/shared/models';

export const featureName = 'loadEmotionList';

export interface LoadEmotionListState {
    emotions: Emotion[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadEmotionListState;
}

export const initialState: LoadEmotionListState = {
    emotions: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
