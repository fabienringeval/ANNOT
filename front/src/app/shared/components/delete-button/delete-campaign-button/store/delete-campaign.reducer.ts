import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    deletingCampaign,
    successDeletingCampaign,
    errorDeletingCampaign
} from './delete-campaign.actions';
import { DeleteButtonState, initialState } from './delete-campaign.state';

export const deleteCampaignButtonFeatureName = 'deleteCampaignButton';

const DeleteButtonReducer = createReducer(
    initialState,
    on(deletingCampaign, (state) => ({
        ...state,
        inProgress: true,
        done: false
    })),
    on(successDeletingCampaign, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorDeletingCampaign, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: DeleteButtonState | undefined, action: Action) {
    return DeleteButtonReducer(state, action);
}
