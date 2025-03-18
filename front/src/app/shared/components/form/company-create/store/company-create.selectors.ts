import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, CompanyCreateState } from './company-create.state';
import { featureName } from './company-create.state';

const getCreateCompanyFeatureState = createFeatureSelector<State, CompanyCreateState>(featureName);

// Company
export const getCompany = createSelector(
  getCreateCompanyFeatureState,
  ({ company }) => company
);

export const getCompanyError = createSelector(
  getCreateCompanyFeatureState,
  ({ error }) => error
);

export const companyInProgress = createSelector(
  getCreateCompanyFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const companyCreationDone = createSelector(
  getCreateCompanyFeatureState,
  ({ done: isDone }) => isDone
);
