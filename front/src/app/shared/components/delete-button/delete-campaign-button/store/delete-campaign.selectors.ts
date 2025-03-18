import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, DeleteButtonState } from './delete-campaign.state';
import { featureName } from './delete-campaign.state';

const getDeleteCampaignFeatureState = createFeatureSelector<State, DeleteButtonState>(featureName);

export const getDeleteCampaignError = createSelector(
  getDeleteCampaignFeatureState,
  ({ error }) => error
);

export const isInProgress = createSelector(
  getDeleteCampaignFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const isDone = createSelector(
  getDeleteCampaignFeatureState,
  ({ done: isDone }) => isDone
);
