import { createAction, props } from '@ngrx/store';
import { TimeInterval } from 'src/app/shared/models';

// create time interval

export const creatingTimeInterval = createAction(
    '[TimeInterval Create Form] Creating time interval',
    props<{ 
        label: string,
        value: number
    }>()
);

export const successCreatingTimeInterval = createAction(
    '[TimeInterval Create Form] Success creating time interval',
    props<{ timeInterval: TimeInterval }>()
);

export const errorCreatingTimeInterval = createAction(
    '[TimeInterval Create Form] Error creating time interval',
    props<{ error: any }>()
);