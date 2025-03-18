import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadAudioListState } from './audio-list.state';
import { featureName } from './audio-list.state';

const getLoadAudioListFeatureState = createFeatureSelector<State, LoadAudioListState>(featureName);

export const getAudioList = createSelector(
  getLoadAudioListFeatureState,
  ({ audios }) => audios
);

export const getTotalAudios = createSelector(
  getLoadAudioListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadAudioListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadAudioListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadAudioListFeatureState,
  ({ done: isDone }) => isDone
);
