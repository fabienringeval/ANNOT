import { createAction, props } from '@ngrx/store';
import { Audio } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingAudioList = createAction(
    '[Pagined Audio List] Loading audio list',
    props<{
        campaignId: number,
        pagination?: Pagination
    }>()
);

export const successLoadingAudioList = createAction(
    '[Pagined Audio List] Success loading audio list',
    props<{ audios: Audio[], total: number }>()
);

export const errorLoadingAudioList = createAction(
    '[Pagined Audio List] Error loading audio list',
    props<{ error: any }>()
);

export const emptyAudioList = createAction('[Pagined Audio List] Empty audio list');
