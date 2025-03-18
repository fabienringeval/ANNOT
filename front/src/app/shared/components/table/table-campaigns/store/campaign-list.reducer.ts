import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingCampaignList,
    successLoadingCampaignList,
    errorLoadingCampaignList,
    emptyCampaignList
} from './campaign-list.actions';
import { Campaign } from 'src/app/shared/models';
import { LoadCampaignListState, initialState } from './campaign-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingCampaignList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingCampaignList, (state, { campaigns, total }: { campaigns: Campaign[], total: number }) => ({
        ...state,
        campaigns,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingCampaignList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyCampaignList, (state) => ({
        ...state,
        users: null,
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadCampaignListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
