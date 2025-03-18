import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LogoutState } from './logout.state';
import { featureName } from './logout.state';

const getLogoutFeatureState = createFeatureSelector<State, LogoutState>(featureName);

// Emotions
export const isLoggedOut = createSelector(
  getLogoutFeatureState,
  ({ loggedOut }) => loggedOut
);

export const getLogoutListError = createSelector(
  getLogoutFeatureState,
  ({ error }) => error
);
