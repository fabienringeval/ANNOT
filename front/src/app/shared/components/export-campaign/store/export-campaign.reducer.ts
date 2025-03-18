import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingAudiosList,
    successLoadingAudiosList,
    errorLoadingAudiosList,
    reset
} from './export-campaign.actions';
import { Audio } from 'src/app/shared/models';
import { ExportCampaignState, initialState } from './export-campaign.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingAudiosList, (state) => ({
        ...state,
        audios: null,
        inProgress: true
    })),
    on(successLoadingAudiosList, (state, { audios, total }: { audios: Audio[], total: number }) => ({
        ...state,
        audios,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingAudiosList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(reset, () => initialState)
);

export function reducer(state: ExportCampaignState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
