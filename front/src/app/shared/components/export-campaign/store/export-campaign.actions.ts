import { createAction, props } from '@ngrx/store';
import { Audio } from 'src/app/shared/models';

// Load User List

export const loadingAudiosList = createAction(
    '[Export Campaign] loading audio list',
    props<{ campaignId: number }>()
);

export const successLoadingAudiosList = createAction(
    '[Export Campaign] Success loading audio list',
    props<{ audios: Audio[], total }>()
);

export const errorLoadingAudiosList = createAction(
    '[Pagined Campaign] Error loading audio list',
    props<{ error: any }>()
);

export const reset = createAction('[Pagined Campaign] Reset');
