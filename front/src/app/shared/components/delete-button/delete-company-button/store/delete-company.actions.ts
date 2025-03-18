import { createAction, props } from '@ngrx/store';

// Delete company

export const deletingCompany = createAction(
    '[Company Delete Button] Deleting company',
    props<{ companyId: number }>()
);

export const successDeletingCompany = createAction('[Company Delete Button] Success deleting company');

export const errorDeletingCompany = createAction(
    '[Company Delete Button] Error deleting company',
    props<{ error: any }>()
);