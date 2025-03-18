import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';

// Load User List

export const loadingProfileList = createAction(
    '[Audio Profiles] Loading profile list',
    props<{ campaignId: number }>()
);

export const successLoadingProfileList = createAction(
    '[Audio Profiles] Success loading profile list',
    props<{ profiles: Profile[] }>()
);

export const errorLoadingProfileList = createAction(
    '[Audio Profiles] Error loading profile list',
    props<{ error: any }>()
);

export const emptyProfileList = createAction('[Pagined Profile List] Empty profile list');
