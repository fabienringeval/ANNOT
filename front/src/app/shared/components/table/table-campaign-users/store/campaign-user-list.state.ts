import * as fromRoot from 'src/app/core/store';
import { User } from 'src/app/shared/models';

export const featureName = 'loadCampaignUserList';

export interface LoadCampaignUserListState {
    users: User[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadCampaignUserListState;
}

export const initialState: LoadCampaignUserListState = {
    users: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
