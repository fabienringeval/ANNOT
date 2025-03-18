import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadUserListState } from './user-list.state';
import { featureName } from './user-list.state';

const getLoadUserListFeatureState = createFeatureSelector<State, LoadUserListState>(featureName);

export const getUserList = createSelector(
  getLoadUserListFeatureState,
  ({ users }) => users
);

export const getTotalUsers = createSelector(
  getLoadUserListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadUserListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadUserListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadUserListFeatureState,
  ({ done: isDone }) => isDone
);
