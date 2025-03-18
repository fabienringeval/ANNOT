import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, ProfileCreateState } from './profile-create.state';
import { featureName } from './profile-create.state';

const getCreateProfileFeatureState = createFeatureSelector<State, ProfileCreateState>(featureName);

// Profile
export const getProfile = createSelector(
  getCreateProfileFeatureState,
  ({ profile }) => profile
);

export const getProfileError = createSelector(
  getCreateProfileFeatureState,
  ({ error }) => error
);

export const profileInProgress = createSelector(
  getCreateProfileFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const profileCreationDone = createSelector(
  getCreateProfileFeatureState,
  ({ done: isDone }) => isDone
);
