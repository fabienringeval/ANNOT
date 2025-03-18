import * as fromRoot from 'src/app/core/store';
import { Campaign } from 'src/app/shared/models';

export const featureName = 'loadCampaignList';

export interface LoadCampaignListState {
    campaigns: Campaign[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadCampaignListState;
}

export const initialState: LoadCampaignListState = {
    campaigns: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
