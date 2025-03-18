import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadProfileListState } from './profile-list.state';
import { featureName } from './profile-list.state';

const getLoadProfileListFeatureState = createFeatureSelector<State, LoadProfileListState>(featureName);

export const getProfileList = createSelector(
  getLoadProfileListFeatureState,
  ({ profiles }) => profiles
);

export const getTotalProfiles = createSelector(
  getLoadProfileListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadProfileListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadProfileListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadProfileListFeatureState,
  ({ done: isDone }) => isDone
);
