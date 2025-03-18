import { createAction, props } from '@ngrx/store';
import { TimeInterval } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingTimeIntervalList = createAction(
    '[Pagined Time Interval List] Loading time interval list',
    props<{ pagination: Pagination }>()
);

export const successLoadingTimeIntervalList = createAction(
    '[Pagined TimeInterval List] Success loading emotion list',
    props<{ timeIntervals: TimeInterval[], total: number }>()
);

export const errorLoadingTimeIntervalList = createAction(
    '[Pagined TimeInterval List] Error loading emotion list',
    props<{ error: any }>()
);

export const emptyTimeIntervalList = createAction('[Pagined TimeInterval List] Empty emotion list');
