import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, UserAddState } from './user-add.state';
import { featureName } from './user-add.state';

const getAddUsersFeatureState = createFeatureSelector<State, UserAddState>(featureName);

// Companies
export const getUserList = createSelector(
  getAddUsersFeatureState,
  ({ userList: { users } }) => users
);

export const getUserListError = createSelector(
  getAddUsersFeatureState,
  ({ userList: { error } }) => error
);

export const userListInProgress = createSelector(
  getAddUsersFeatureState,
  ({ userList: { inProgress: isInProgress } }) => isInProgress
);

export const userListDone = createSelector(
  getAddUsersFeatureState,
  ({ userList: { done: isDone } }) => isDone
);

export const done = createSelector(
  getAddUsersFeatureState,
  ({ done }) => done
);
