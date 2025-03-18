import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, DeleteButtonState } from './delete-profile.state';
import { featureName } from './delete-profile.state';

const getDeleteProfileFeatureState = createFeatureSelector<State, DeleteButtonState>(featureName);

// Profiles

export const getProfileListError = createSelector(
  getDeleteProfileFeatureState,
  ({ error }) => error
);

export const isInProgress = createSelector(
  getDeleteProfileFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const isDone = createSelector(
  getDeleteProfileFeatureState,
  ({ done: isDone }) => isDone
);
