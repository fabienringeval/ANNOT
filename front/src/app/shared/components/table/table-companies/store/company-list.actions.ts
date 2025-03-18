import { createAction, props } from '@ngrx/store';
import { Company } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingCompanyList = createAction(
    '[Pagined Company List] Loading company list',
    props<{ pagination: Pagination }>()
);

export const successLoadingCompanyList = createAction(
    '[Pagined Company List] Success loading company list',
    props<{ companies: Company[], total: number }>()
);

export const errorLoadingCompanyList = createAction(
    '[Pagined Company List] Error loading company list',
    props<{ error: any }>()
);

export const emptyCompanyList = createAction('[Pagined Company List] Empty company list');
