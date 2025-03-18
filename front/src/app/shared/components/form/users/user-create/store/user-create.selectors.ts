import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, UserCreateState } from './user-create.state';
import { featureName } from './user-create.state';

const getCreateUserFeatureState = createFeatureSelector<State, UserCreateState>(featureName);

// Companies
export const getCompanies = createSelector(
  getCreateUserFeatureState,
  ({ companyList: { companies } }) => companies
);

export const getCompanyListError = createSelector(
  getCreateUserFeatureState,
  ({ companyList: { error } }) => error
);

export const companyListInProgress = createSelector(
  getCreateUserFeatureState,
  ({ companyList: { inProgress: isInProgress } }) => isInProgress
);

export const companyListDone = createSelector(
  getCreateUserFeatureState,
  ({ companyList: { done: isDone } }) => isDone
);

// User
export const getUser = createSelector(
  getCreateUserFeatureState,
  ({ user: { user } }) => user
);

export const getUserError = createSelector(
  getCreateUserFeatureState,
  ({ user: { error } }) => error
);

export const userInProgress = createSelector(
  getCreateUserFeatureState,
  ({ user: { inProgress: isInProgress } }) => isInProgress
);

export const userCreationDone = createSelector(
  getCreateUserFeatureState,
  ({ user: { done: isDone } }) => isDone
);
