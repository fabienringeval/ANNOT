import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, DeleteButtonState } from './delete-time-interval.state';
import { featureName } from './delete-time-interval.state';

const getDeleteTimeIntervalFeatureState = createFeatureSelector<State, DeleteButtonState>(featureName);

// TimeIntervals

export const getTimeIntervalListError = createSelector(
  getDeleteTimeIntervalFeatureState,
  ({ error }) => error
);

export const isInProgress = createSelector(
  getDeleteTimeIntervalFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const isDone = createSelector(
  getDeleteTimeIntervalFeatureState,
  ({ done: isDone }) => isDone
);
