import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, AudioProfilesState } from './audio-profiles.state';
import { featureName } from './audio-profiles.state';

const getAudioProfilesFeatureState = createFeatureSelector<State, AudioProfilesState>(featureName);

export const getProfileList = createSelector(
  getAudioProfilesFeatureState,
  ({ profiles }) => profiles
);

export const getError = createSelector(
  getAudioProfilesFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getAudioProfilesFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getAudioProfilesFeatureState,
  ({ done: isDone }) => isDone
);
