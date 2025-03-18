import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, DeleteButtonState } from './delete-audio.state';
import { featureName } from './delete-audio.state';

const getDeleteAudioFeatureState = createFeatureSelector<State, DeleteButtonState>(featureName);

// Audios

export const getAudioListError = createSelector(
  getDeleteAudioFeatureState,
  ({ error }) => error
);

export const isInProgress = createSelector(
  getDeleteAudioFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const isDone = createSelector(
  getDeleteAudioFeatureState,
  ({ done: isDone }) => isDone
);
