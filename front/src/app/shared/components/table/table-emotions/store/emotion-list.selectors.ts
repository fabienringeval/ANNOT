import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadEmotionListState } from './emotion-list.state';
import { featureName } from './emotion-list.state';

const getLoadEmotionListFeatureState = createFeatureSelector<State, LoadEmotionListState>(featureName);

export const getEmotionList = createSelector(
  getLoadEmotionListFeatureState,
  ({ emotions }) => emotions
);

export const getTotalEmotions = createSelector(
  getLoadEmotionListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadEmotionListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadEmotionListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadEmotionListFeatureState,
  ({ done: isDone }) => isDone
);
