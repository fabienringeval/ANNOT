import { createAction, props } from '@ngrx/store';

// Delete emotion

export const deletingEmotion = createAction(
    '[Emotion Delete Button] Deleting emotion',
    props<{ emotionId: number }>()
);

export const successDeletingEmotion = createAction('[Emotion Delete Button] Success deleting emotion');

export const errorDeletingEmotion = createAction(
    '[Emotion Delete Button] Error deleting emotion',
    props<{ error: any }>()
);