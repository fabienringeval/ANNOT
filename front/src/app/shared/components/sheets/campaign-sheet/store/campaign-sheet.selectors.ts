import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, CampaignSheetState } from './campaign-sheet.state';
import { featureName } from './campaign-sheet.state';

const getLoadCampaignFeatureState = createFeatureSelector<State, CampaignSheetState>(featureName);

export const getCampaign = createSelector(
  getLoadCampaignFeatureState,
  ({ campaign }) => campaign
);

export const getError = createSelector(
  getLoadCampaignFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getLoadCampaignFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getLoadCampaignFeatureState,
  ({ done: isDone }) => isDone
);

export const getEmotions = createSelector(
  getLoadCampaignFeatureState,
  ({ emotions: { list } }) => list
);

export const getProfiles = createSelector(
  getLoadCampaignFeatureState,
  ({ profiles: { list } }) => list
);

export const getTimeInterval = createSelector(
  getLoadCampaignFeatureState,
  ({ timeInterval: { interval } }) => interval
);

export const getSliderConfig = createSelector(
  getLoadCampaignFeatureState,
  ({ sliderConfig: { config } }) => config
);
