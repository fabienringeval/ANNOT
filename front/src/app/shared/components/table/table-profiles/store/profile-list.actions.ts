import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingProfileList = createAction(
    '[Pagined Profile List] Loading profile list',
    props<{
        pagination?: Pagination
    }>()
);

export const successLoadingProfileList = createAction(
    '[Pagined Profile List] Success loading profile list',
    props<{ profiles: Profile[], total: number }>()
);

export const errorLoadingProfileList = createAction(
    '[Pagined Profile List] Error loading profile list',
    props<{ error: any }>()
);

export const emptyProfileList = createAction('[Pagined Profile List] Empty profile list');
