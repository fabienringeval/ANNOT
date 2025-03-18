import { createAction, props } from '@ngrx/store';
import { Company } from 'src/app/shared/models';

// create company

export const creatingCompany = createAction(
    '[Company Create Form] Creating company',
    props<{ 
        name: string,
        description: string
    }>()
);

export const successCreatingCompany = createAction(
    '[Company Create Form] Success creating company',
    props<{ company: Company }>()
);

export const errorCreatingCompany = createAction(
    '[Company Create Form] Error creating company',
    props<{ error: any }>()
);