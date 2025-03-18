import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, EmotionAnnotatorState } from './emotion-annotator.state';
import { featureName } from './emotion-annotator.state';

const getEmotionAnnotatorFeatureState = createFeatureSelector<State, EmotionAnnotatorState>(featureName);

export const getSliderConfiguration = createSelector(
  getEmotionAnnotatorFeatureState,
  ({ sliderConfig }) => sliderConfig
);

export const getTimeInterval = createSelector(
  getEmotionAnnotatorFeatureState,
  ({ timeInterval }) => timeInterval
);
