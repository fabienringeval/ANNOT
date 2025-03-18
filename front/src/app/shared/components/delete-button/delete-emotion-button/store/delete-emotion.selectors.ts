import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, DeleteButtonState } from './delete-emotion.state';
import { featureName } from './delete-emotion.state';

const getDeleteEmotionFeatureState = createFeatureSelector<State, DeleteButtonState>(featureName);

// Emotions

export const getDeleteEmotionError = createSelector(
  getDeleteEmotionFeatureState,
  ({ error }) => error
);

export const isInProgress = createSelector(
  getDeleteEmotionFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const isDone = createSelector(
  getDeleteEmotionFeatureState,
  ({ done: isDone }) => isDone
);
