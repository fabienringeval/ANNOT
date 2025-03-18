import { createAction, props } from '@ngrx/store';
import { Emotion } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingEmotionList = createAction(
    '[Pagined Emotion List] Loading emotion list',
    props<{ pagination: Pagination }>()
);

export const successLoadingEmotionList = createAction(
    '[Pagined Emotion List] Success loading emotion list',
    props<{ emotions: Emotion[], total: number }>()
);

export const errorLoadingEmotionList = createAction(
    '[Pagined Emotion List] Error loading emotion list',
    props<{ error: any }>()
);

export const emptyEmotionList = createAction('[Pagined Emotion List] Empty emotion list');
