import * as fromRoot from 'src/app/core/store';
import { SliderConfiguration, TimeInterval } from 'src/app/shared/models';

export const featureName = 'emotionAnnotator';

export interface EmotionAnnotatorState {
    sliderConfig: SliderConfiguration;
    timeInterval: TimeInterval;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: State;
}

export const initialState: EmotionAnnotatorState = {
    sliderConfig: null,
    timeInterval: null,
    error: null
};
