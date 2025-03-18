import { createAction, props } from '@ngrx/store';

// Delete time interval

export const deletingTimeInterval = createAction(
    '[TimeInterval Delete Button] Deleting time interval',
    props<{ timeIntervalId: number }>()
);

export const successDeletingTimeInterval = createAction('[TimeInterval Delete Button] Success deleting time interval');

export const errorDeletingTimeInterval = createAction(
    '[TimeInterval Delete Button] Error deleting time interval',
    props<{ error: any }>()
);