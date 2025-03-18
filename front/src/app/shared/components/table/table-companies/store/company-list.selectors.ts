import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadCompanyListState } from './company-list.state';
import { featureName } from './company-list.state';

const getLoadCompanyListFeatureState = createFeatureSelector<State, LoadCompanyListState>(featureName);

export const getCompanyList = createSelector(
  getLoadCompanyListFeatureState,
  ({ companies }) => companies
);

export const getTotalCompanies = createSelector(
  getLoadCompanyListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadCompanyListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadCompanyListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadCompanyListFeatureState,
  ({ done: isDone }) => isDone
);
