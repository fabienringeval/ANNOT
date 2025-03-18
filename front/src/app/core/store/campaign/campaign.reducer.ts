import { Action, createReducer, on } from '@ngrx/store';
import {
    loadingCampaign,
    successLoadingCampaign,
    errorLoadingCampaign,
    endingCampaign,
    successEndingCampaign,
    errorEndingCampaign,
    startingCampaign,
    successStartingCampaign,
    errorStartingCampaign,
    deletingCampaign,
    successDeletingCampaign,
    loadingEmotions,
    successLoadingEmotions,
    errorLoadingEmotions
} from './campaign.actions';
import { State, initialState } from './campaign.state';
import { Emotion, Campaign, Audio } from 'src/app/shared/models';

const campaignReducer = createReducer(
    initialState,
    on(loadingCampaign, (state) => ({
        ...state,
        error: false,
        loading: true
    })),
    on(successLoadingCampaign, (state, { campaign }: { campaign: Campaign }) => ({
        ...state,
        campaign,
        loading: false,
        loaded: true
    })),
    on(errorLoadingCampaign, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(loadingEmotions, (state) => ({
        ...state,
        error: false,
        loadingEmotionList: true
    })),
    on(successLoadingEmotions, (state, { emotions }: { emotions: Emotion[] }) => ({
        ...state,
        emotionList: emotions,
        loadingEmotionList: false,
        loadedEmotionList: true
    })),
    on(errorLoadingEmotions, (state, { error }) => ({
        ...state,
        loadingEmotionList: false,
        error
    })),
    on(endingCampaign, (state) => ({
        ...state,
        error: false,
        updating: true,
        updated: false
    })),
    on(successEndingCampaign, (state) => ({
        ...state,
        updating: false,
        updated: true,
        campaign: {
            ...state.campaign,
            ended: true
        }
    })),
    on(errorEndingCampaign, (state, { error }) => ({
        ...state,
        updating: false,
        error
    })),
    on(startingCampaign, (state) => ({
        ...state,
        error: false,
        updating: true,
        updated: false
    })),
    on(successStartingCampaign, (state) => ({
        ...state,
        updating: false,
        updated: true,
        campaign: {
            ...state.campaign,
            ended: false
        },
    })),
    on(errorStartingCampaign, (state, { error }) => ({
        ...state,
        updating: false,
        error
    })),
    // deleting campaign
    on(deletingCampaign, (state) => ({
        ...state,
        deleting: false,
        deleted: false,
        error: false
    })),
    on(successDeletingCampaign, (state) => ({
        ...state,
        deleting: false,
        deleted:true,
    })),
    on(errorStartingCampaign, (state, { error }) => ({
        ...state,
        deleting: false,
        error
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return campaignReducer(state, action);
}
