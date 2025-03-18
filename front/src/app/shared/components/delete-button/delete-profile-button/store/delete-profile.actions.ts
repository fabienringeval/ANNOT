import { createAction, props } from '@ngrx/store';

// Delete profile

export const deletingProfile = createAction(
    '[Profile Delete Button] Deleting profile',
    props<{ profileId: number }>()
);

export const successDeletingProfile = createAction('[Profile Delete Button] Success deleting profile');

export const errorDeletingProfile = createAction(
    '[Profile Delete Button] Error deleting profile',
    props<{ error: any }>()
);