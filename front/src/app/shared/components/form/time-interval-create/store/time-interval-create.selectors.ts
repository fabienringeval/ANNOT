import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, TimeIntervalCreateState } from './time-interval-create.state';
import { featureName } from './time-interval-create.state';

const getCreateTimeIntervalFeatureState = createFeatureSelector<State, TimeIntervalCreateState>(featureName);

// TimeInterval
export const getTimeInterval = createSelector(
  getCreateTimeIntervalFeatureState,
  ({ timeInterval }) => timeInterval
);

export const getTimeIntervalError = createSelector(
  getCreateTimeIntervalFeatureState,
  ({ error }) => error
);

export const timeIntervalInProgress = createSelector(
  getCreateTimeIntervalFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const timeIntervalCreationDone = createSelector(
  getCreateTimeIntervalFeatureState,
  ({ done: isDone }) => isDone
);
