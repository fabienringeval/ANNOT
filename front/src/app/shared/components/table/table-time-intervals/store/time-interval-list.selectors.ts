import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadTimeIntervalListState } from './time-interval-list.state';
import { featureName } from './time-interval-list.state';

const getLoadTimeIntervalListFeatureState = createFeatureSelector<State, LoadTimeIntervalListState>(featureName);

export const getTimeIntervalList = createSelector(
  getLoadTimeIntervalListFeatureState,
  ({ timeIntervals }) => timeIntervals
);

export const getTotalTimeIntervals = createSelector(
  getLoadTimeIntervalListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadTimeIntervalListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadTimeIntervalListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadTimeIntervalListFeatureState,
  ({ done: isDone }) => isDone
);
