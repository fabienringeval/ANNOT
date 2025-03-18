import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, EmotionCreateState } from './emotion-create.state';
import { featureName } from './emotion-create.state';

const getCreateEmotionFeatureState = createFeatureSelector<State, EmotionCreateState>(featureName);

// Emotion
export const getEmotion = createSelector(
  getCreateEmotionFeatureState,
  ({ emotion }) => emotion
);

export const getEmotionError = createSelector(
  getCreateEmotionFeatureState,
  ({ error }) => error
);

export const emotionInProgress = createSelector(
  getCreateEmotionFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const emotionCreationDone = createSelector(
  getCreateEmotionFeatureState,
  ({ done: isDone }) => isDone
);
