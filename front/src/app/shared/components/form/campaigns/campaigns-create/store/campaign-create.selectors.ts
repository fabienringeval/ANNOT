import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, CampaignCreateState } from './campaign-create.state';
import { featureName } from './campaign-create.state';

const getCreateCampaignFeatureState = createFeatureSelector<State, CampaignCreateState>(featureName);

// Emotions
export const getEmotions = createSelector(
  getCreateCampaignFeatureState,
  ({ emotionList: { emotions } }) => emotions
);

export const getEmotionListError = createSelector(
  getCreateCampaignFeatureState,
  ({ emotionList: { error } }) => error
);

export const emotionListInProgress = createSelector(
  getCreateCampaignFeatureState,
  ({ emotionList: { inProgress: isInProgress } }) => isInProgress
);

export const emotionListDone = createSelector(
  getCreateCampaignFeatureState,
  ({ emotionList: { done: isDone } }) => isDone
);

// Companies
export const getCompanies = createSelector(
  getCreateCampaignFeatureState,
  ({ companyList: { companies } }) => companies
);

export const getCompanyListError = createSelector(
  getCreateCampaignFeatureState,
  ({ companyList: { error } }) => error
);

export const companyListInProgress = createSelector(
  getCreateCampaignFeatureState,
  ({ companyList: { inProgress: isInProgress } }) => isInProgress
);

export const companyListDone = createSelector(
  getCreateCampaignFeatureState,
  ({ companyList: { done: isDone } }) => isDone
);

// Profiles
export const getProfiles = createSelector(
  getCreateCampaignFeatureState,
  ({ profileList: { profiles } }) => profiles
);

export const getProfileListError = createSelector(
  getCreateCampaignFeatureState,
  ({ profileList: { error } }) => error
);

export const profileListInProgress = createSelector(
  getCreateCampaignFeatureState,
  ({ profileList: { inProgress: isInProgress } }) => isInProgress
);

export const profileListDone = createSelector(
  getCreateCampaignFeatureState,
  ({ profileList: { done: isDone } }) => isDone
);

// Time intervals
export const getTimeIntervals = createSelector(
  getCreateCampaignFeatureState,
  ({ timeIntervalList: { timeIntervals } }) => timeIntervals
);

export const getTimeIntervalListError = createSelector(
  getCreateCampaignFeatureState,
  ({ timeIntervalList: { error } }) => error
);

export const timeIntervalListInProgress = createSelector(
  getCreateCampaignFeatureState,
  ({ timeIntervalList: { inProgress: isInProgress } }) => isInProgress
);

export const timeIntervalListDone = createSelector(
  getCreateCampaignFeatureState,
  ({ timeIntervalList: { done: isDone } }) => isDone
);

// Campaign
export const getCampaign = createSelector(
  getCreateCampaignFeatureState,
  ({ campaign: { campaign } }) => campaign
);

export const getCampaignError = createSelector(
  getCreateCampaignFeatureState,
  ({ campaign: { error } }) => error
);

export const campaignInProgress = createSelector(
  getCreateCampaignFeatureState,
  ({ campaign: { inProgress: isInProgress } }) => isInProgress
);

export const campaignCreationDone = createSelector(
  getCreateCampaignFeatureState,
  ({ campaign: { done: isDone } }) => isDone
);
