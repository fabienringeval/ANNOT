import { createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';

export const selectAuthState = (state: AppState) => state.auth;

export const getAccessToken = createSelector(
  selectAuthState,
  ({ accessToken }: { accessToken: string }) => accessToken
);

export const getRefreshToken = createSelector(
  selectAuthState,
  ({ refreshToken }: { refreshToken: string }) => refreshToken
);

export const isLogged = createSelector(
  selectAuthState,
  ({ logged }: { logged: boolean }) => logged
);

export const isInProgress = createSelector(
  selectAuthState,
  ({ inProgress }: { inProgress: boolean }) => inProgress
);

export const getError = createSelector(
  selectAuthState,
  ({ error }: { error: any }) => error
);
