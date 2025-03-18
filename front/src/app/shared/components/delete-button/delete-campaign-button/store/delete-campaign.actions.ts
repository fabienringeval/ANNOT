import { createAction, props } from '@ngrx/store';

// Delete campaign

export const deletingCampaign = createAction(
    '[Campaign Delete Button] Deleting campaign',
    props<{ campaignId: number }>()
);

export const successDeletingCampaign = createAction('[Campaign Delete Button] Success deleting campaign');

export const errorDeletingCampaign = createAction(
    '[Campaign Delete Button] Error deleting campaign',
    props<{ error: any }>()
);