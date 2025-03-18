import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingUserList = createAction(
    '[Pagined User List] Loading user list',
    props<{ pagination?: Pagination }>()
);

export const successLoadingUserList = createAction(
    '[Pagined User List] Success loading user list',
    props<{ users: User[], total: number }>()
);

export const errorLoadingUserList = createAction(
    '[Pagined User List] Error loading user list',
    props<{ error: any }>()
);

export const emptyUserList = createAction('[Pagined User List] Empty user list');
