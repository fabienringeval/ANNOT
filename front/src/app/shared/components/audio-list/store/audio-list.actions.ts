import { createAction, props } from '@ngrx/store';
import { Audio } from 'src/app/shared/models';

/**
 * loading campaign audios
 */

export const loadingAudios = createAction(
    '[Campaign] Loading campaign audios',
    props<{ campaignId: number }>()
);

export const successLoadingAudios = createAction(
    '[Campaign] Success loading Campaign audios',
    props<{ audios: Audio[], total: number }>()
);

export const errorLoadingAudios = createAction(
    '[Campaign] Error loading campaign audios',
    props<{ error: object }>()
);
