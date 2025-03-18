import { createAction, props } from '@ngrx/store';

// Delete audio

export const deletingAudio = createAction(
    '[Audio Delete Button] Deleting audio',
    props<{ audioId: number }>()
);

export const successDeletingAudio = createAction('[Audio Delete Button] Success deleting audio');

export const errorDeletingAudio = createAction(
    '[Audio Delete Button] Error deleting audio',
    props<{ error: any }>()
);