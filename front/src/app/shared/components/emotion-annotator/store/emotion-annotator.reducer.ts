import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingEmotionalAnalysisSliderConfiguration,
    successLoadingEmotionalAnalysisSliderConfiguration,
    errorLoadingEmotionalAnalysisSliderConfiguration,
    loadingEmotionalAnalysisTimeInterval,
    successLoadingEmotionalAnalysisTimeInterval,
    errorLoadingEmotionalAnalysisTimeInterval,
    reset
} from './emotion-annotator.actions';
import { SliderConfiguration, TimeInterval } from 'src/app/shared/models';
import { EmotionAnnotatorState, initialState } from './emotion-annotator.state';

const EmotionAnnotatorReducer = createReducer(
    initialState,
    on(loadingEmotionalAnalysisSliderConfiguration, (state) => ({
        ...state,
        error: false
    })),
    on(successLoadingEmotionalAnalysisSliderConfiguration, (state, { sliderConfig }: { sliderConfig: SliderConfiguration }) => ({
        ...state,
        sliderConfig
    })),
    on(errorLoadingEmotionalAnalysisSliderConfiguration, (state, { error }) => ({
        ...state,
        error
    })),
    on(loadingEmotionalAnalysisTimeInterval, (state) => ({
        ...state,
        error: false
    })),
    on(successLoadingEmotionalAnalysisTimeInterval, (state, { timeInterval }: { timeInterval: TimeInterval }) => ({
        ...state,
        timeInterval
    })),
    on(errorLoadingEmotionalAnalysisTimeInterval, (state, { error }) => ({
        ...state,
        error
    })),
    on(reset, () => initialState)

    
);

export function reducer(state: EmotionAnnotatorState | undefined, action: Action) {
    return EmotionAnnotatorReducer(state, action);
}
