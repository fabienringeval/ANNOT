import { createAction, props } from '@ngrx/store';
import { Campaign } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingCampaignList = createAction(
    '[Pagined Campaign List] Loading campaign list',
    props<{ pagination?: Pagination }>()
);

export const successLoadingCampaignList = createAction(
    '[Pagined Campaign List] Success loading campaign list',
    props<{ campaigns: Campaign[], total: number }>()
);

export const errorLoadingCampaignList = createAction(
    '[Pagined Campaign List] Error loading campaign list',
    props<{ error: any }>()
);

export const emptyCampaignList = createAction('[Pagined Campaign List] Empty campaign list');
