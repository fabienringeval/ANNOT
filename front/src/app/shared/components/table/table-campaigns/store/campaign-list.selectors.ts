import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, LoadCampaignListState } from './campaign-list.state';
import { featureName } from './campaign-list.state';

const getLoadCampaignListFeatureState = createFeatureSelector<State, LoadCampaignListState>(featureName);

export const getCampaignList = createSelector(
  getLoadCampaignListFeatureState,
  ({ campaigns }) => campaigns
);

export const getTotalCampaigns = createSelector(
  getLoadCampaignListFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getLoadCampaignListFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadCampaignListFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadCampaignListFeatureState,
  ({ done: isDone }) => isDone
);
