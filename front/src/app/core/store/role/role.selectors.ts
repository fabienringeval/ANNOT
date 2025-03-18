import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app-store.state';

export const selectRole = (state: AppState) => state.role;

export const getRoles = createSelector(
  selectRole,
  ({ roles }) => roles
);

export const getModules = createSelector(
  selectRole,
  ({ modules }) => modules
);

export const getError = createSelector(
  selectRole,
  ({ error }) => error
);

export const isGranted = createSelector(
  selectRole,
  ({ granted }) => granted
);
