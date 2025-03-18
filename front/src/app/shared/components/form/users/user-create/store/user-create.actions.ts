import { createAction, props } from '@ngrx/store';
import { Company, User } from 'src/app/shared/models';

// load companies

export const loadingCompanyList = createAction('[User Create Form] Loading companies');

export const successLoadingCompanyList = createAction(
    '[User Create Form] Success loading companies',
    props<{ companies: Company[] }>()
);

export const errorLoadingCompanyList = createAction(
    '[User Create Form] Error loading companies',
    props<{ error: any }>()
);

// create user

export const creatingUser = createAction(
    '[User Create Form] Creating user',
    props<{ 
        firstName: string,
        lastName: string,
        email: string,
        company: Company,
        password:string
    }>()
);

export const successCreatingUser = createAction(
    '[User Create Form] Success creating user',
    props<{ user: User }>()
);

export const errorCreatingUser = createAction(
    '[User Create Form] Error creating user',
    props<{ error: any }>()
);