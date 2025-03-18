import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/shared/models';

// create profile

export const creatingProfile = createAction(
    '[Profile Create Form] Creating profile',
    props<{ 
        name: string,
        description: string,
        labels?: string[]
    }>()
);

export const successCreatingProfile = createAction(
    '[Profile Create Form] Success creating profile',
    props<{ profile: Profile }>()
);

export const errorCreatingProfile = createAction(
    '[Profile Create Form] Error creating profile',
    props<{ error: any }>()
);