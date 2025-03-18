import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, DeleteButtonState } from './delete-company.state';
import { featureName } from './delete-company.state';

const getDeleteCompanyFeatureState = createFeatureSelector<State, DeleteButtonState>(featureName);

export const getDeleteCompanyError = createSelector(
  getDeleteCompanyFeatureState,
  ({ error }) => error
);

export const isInProgress = createSelector(
  getDeleteCompanyFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const isDone = createSelector(
  getDeleteCompanyFeatureState,
  ({ done: isDone }) => isDone
);
