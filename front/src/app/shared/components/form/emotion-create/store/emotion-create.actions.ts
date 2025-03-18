import { createAction, props } from '@ngrx/store';
import { Emotion } from 'src/app/shared/models';

// create emotion

export const creatingEmotion = createAction(
    '[Emotion Create Form] Creating emotion',
    props<{ 
        name: string,
        description: string
        //image: string
    }>()
);

export const successCreatingEmotion = createAction(
    '[Emotion Create Form] Success creating emotion',
    props<{ emotion: Emotion }>()
);

export const errorCreatingEmotion = createAction(
    '[Emotion Create Form] Error creating emotion',
    props<{ error: any }>()
);
