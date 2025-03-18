import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, ExportCampaignState } from './export-campaign.state';
import { featureName } from './export-campaign.state';

const getExportCampaignFeatureState = createFeatureSelector<State, ExportCampaignState>(featureName);

export const getAudioList = createSelector(
  getExportCampaignFeatureState,
  ({ audios }) => audios
);

export const getTotalUsers = createSelector(
  getExportCampaignFeatureState,
  ({ total }) => total
);

export const getError = createSelector(
  getExportCampaignFeatureState,
  ({ error }) => error
);

export const inProgress = createSelector(
  getExportCampaignFeatureState,
  ({ inProgress: isInProgress }) => isInProgress
);

export const done = createSelector(
  getExportCampaignFeatureState,
  ({ done: isDone }) => isDone
);
