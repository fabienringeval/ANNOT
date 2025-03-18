import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadCampaignUserListState } from './campaign-user-list.state';
import { featureName } from './campaign-user-list.state';

const getLoadUserListFeatureState = createFeatureSelector<State, LoadCampaignUserListState>(featureName);

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
