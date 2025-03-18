import { createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { User } from 'src/app/shared/models';

export const selectSelfState = (state: AppState) => state.self;

export const getUser = createSelector(
  selectSelfState,
  ({ user }: { user: User }) => user
);

export const userLoaded = createSelector(
  selectSelfState,
  ({ done }: { done: boolean }) => done
);

export const getLoadingInProgress = createSelector(
  selectSelfState,
  ({ inProgress }: { inProgress: boolean }) => inProgress
);

export const getLoadingError = createSelector(
  selectSelfState,
  ({ error }: { error: any }) => error
);
