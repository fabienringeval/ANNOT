import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app-store.state';

export const selectCampaign = (state: AppState) => state.campaign;

export const getCampaign = createSelector(
  selectCampaign,
  ({ campaign }) => campaign
);

export const getEmotionList = createSelector(
  selectCampaign,
  ({ emotionList }) => emotionList
);

export const isActive = createSelector(
  selectCampaign,
  ({ campaign }) => campaign ? !campaign.ended : null
);

export const isDeleted = createSelector(
  selectCampaign,
  ({ deleted }) => deleted
);

export const done = createSelector(
  selectCampaign,
  ({ loaded }) => loaded
);

export const error = createSelector(
  selectCampaign,
  ({ error }) => error
);

export const updated = createSelector(
  selectCampaign,
  ({ updated }) => updated
);

export const deleted = createSelector(
  selectCampaign,
  ({ deleted }) => deleted
);
