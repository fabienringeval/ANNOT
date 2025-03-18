import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, TopUserState } from './top-user.state';
import { featureName } from './top-user.state';

const getTopUserFeatureState = createFeatureSelector<State, TopUserState>(featureName);

export const getFirstName = createSelector(
  getTopUserFeatureState,
  ({ firstName }) => firstName
);

export const getLastName = createSelector(
  getTopUserFeatureState,
  ({ lastName }) => lastName
);

export const getError = createSelector(
  getTopUserFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getTopUserFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getTopUserFeatureState,
  ({ done: isDone }) => isDone
);
