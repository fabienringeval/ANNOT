import { createAction, props } from '@ngrx/store';
import { Campaign, Emotion, Audio } from 'src/app/shared/models';

/**
 * loading campaign
 */

export const loadingCampaign = createAction(
    '[Campaign] Loading campaign',
    props<{ campaignId: number }>()
);

export const successLoadingCampaign = createAction(
    '[Campaign] Success loading Campaign',
    props<{ campaign: Campaign }>()
);

export const errorLoadingCampaign = createAction(
    '[Campaign] Error loading campaign',
    props<{ error: object }>()
);

/**
 * loading campaign emotions
 */

export const loadingEmotions = createAction(
    '[Campaign] Loading campaign emotions',
    props<{ campaignId: number }>()
);

export const successLoadingEmotions = createAction(
    '[Campaign] Success loading Campaign emotions',
    props<{ emotions: Emotion[] }>()
);

export const errorLoadingEmotions = createAction(
    '[Campaign] Error loading campaign emotions',
    props<{ error: object }>()
);

/**
 * end campaign
 */

export const endingCampaign = createAction(
    '[Campaign] Ending campaign',
    props<{ campaignId: number }>()
);

export const successEndingCampaign = createAction('[Campaign] Success ending Campaign');

export const errorEndingCampaign = createAction(
    '[Campaign] Error ending campaign',
    props<{ error: object }>()
);

/**
 * start campaign
 */

export const startingCampaign = createAction(
    '[Campaign] Starting campaign',
    props<{ campaignId: number }>()
);

export const successStartingCampaign = createAction('[Campaign] Success starting Campaign');

export const errorStartingCampaign = createAction(
    '[Campaign] Error starting campaign',
    props<{ error: object }>()
);

/**
 * Delete campaign
 */

export const deletingCampaign = createAction(
    '[Campaign] Deleting campaign',
    props<{ campaignId: number }>()
);

export const successDeletingCampaign = createAction('[Campaign] Success deleting Campaign');

export const errorDeletingCampaign = createAction(
    '[Campaign] Error deleting campaign',
    props<{ error: object }>()
);
