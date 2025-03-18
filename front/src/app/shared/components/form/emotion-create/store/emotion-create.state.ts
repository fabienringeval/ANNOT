import * as fromRoot from 'src/app/core/store';
import { Emotion } from 'src/app/shared/models';

export const featureName = 'emotionCreate';

export interface EmotionCreateState {
    emotion: Emotion;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: EmotionCreateState;
}

export const initialState: EmotionCreateState = {
    emotion: null,
    inProgress: false,
    done: false,
    error: null
};
