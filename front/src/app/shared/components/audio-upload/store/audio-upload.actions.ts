import { createAction, props } from '@ngrx/store';
import { Upload } from 'src/app/shared/models';

/**
 * Upload audios
 */

export const uploadingAudios = createAction(
    '[Upload] Uploading audios',
    props<{ campaignId: number, audios: File[] }>()
);

export const successUploadingAudios = createAction(
    '[Upload] Success uploading audios',
    props<{ uploads: Upload[] }>()
);

export const errorUploadingAudios = createAction(
    '[Upload] Error uploading audios',
    props<{ error: object }>()
);

/**
 * Add audios
 */

export const addingAudios = createAction(
    '[Upload] Adding audios',
    props<{ campaignId: number, uploads: Upload[] }>()
);

export const successAddingAudios = createAction('[Upload] Success adding audios');

export const errorAddingAudios = createAction(
    '[Upload] Error adding audios',
    props<{ error: object }>()
);

/**
 * RESET
 */

export const reset = createAction('[Upload] Reset');
