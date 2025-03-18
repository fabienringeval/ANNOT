import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingEmotionList,
    successLoadingEmotionList,
    errorLoadingEmotionList,
    loadingCompanyList,
    successLoadingCompanyList,
    errorLoadingCompanyList,
    loadingTimeIntervalList,
    successLoadingTimeIntervalList,
    errorLoadingTimeIntervalList,
    creatingCampaign,
    successCreatingCampaign,
    errorCreatingCampaign,
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList,
    reset
} from './campaign-create.actions';
import { Emotion, Company, TimeInterval, Campaign, Profile } from 'src/app/shared/models';
import { CampaignCreateState, initialState } from './campaign-create.state';

export const loadUserListFeatureName = 'loadUserList';

const createCampaignReducer = createReducer(
    initialState,
    on(loadingEmotionList, (state) => ({
        ...state,
        emotionList: {
            ...state.emotionList,
            emotions: null,
            inProgress: true
        }
    })),
    on(successLoadingEmotionList, (state, { emotions }: { emotions: Emotion[] }) => ({
        ...state,
        emotionList: {
            ...state.emotionList,
            emotions,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingEmotionList, (state, { error }: { error: any }) => ({
        ...state,
        emotionList: {
            ...state.emotionList,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(loadingCompanyList, (state) => ({
        ...state,
        companyList: {
            ...state.companyList,
            companies: null,
            inProgress: true
        }
    })),
    on(successLoadingCompanyList, (state, { companies }: { companies: Company[] }) => ({
        ...state,
        companyList: {
            ...state.companyList,
            companies,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingCompanyList, (state, { error }: { error: any }) => ({
        ...state,
        companyList: {
            ...state.companyList,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(loadingProfileList, (state) => ({
        ...state,
        profileList: {
            ...state.profileList,
            profiles: null,
            inProgress: true
        }
    })),
    on(successLoadingProfileList, (state, { profiles }: { profiles: Profile[] }) => ({
        ...state,
        profileList: {
            ...state.profileList,
            profiles,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingProfileList, (state, { error }: { error: any }) => ({
        ...state,
        profileList: {
            ...state.profileList,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(loadingTimeIntervalList, (state) => ({
        ...state,
        timeIntervalList: {
            ...state.timeIntervalList,
            timeIntervals: null,
            inProgress: true
        }
    })),
    on(successLoadingTimeIntervalList, (state, { timeIntervals }: { timeIntervals: TimeInterval[] }) => ({
        ...state,
        timeIntervalList: {
            ...state.timeIntervalList,
            timeIntervals,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingTimeIntervalList, (state, { error }: { error: any }) => ({
        ...state,
        timeIntervalList: {
            ...state.timeIntervalList,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(creatingCampaign, (state) => ({
        ...state,
        campaign: {
            ...state.campaign,
            timeIntervals: null,
            inProgress: true
        }
    })),
    on(successCreatingCampaign, (state, { campaign }: { campaign: Campaign }) => ({
        ...state,
        campaign: {
            ...state.campaign,
            campaign,
            inProgress: false,
            done: true
        }
    })),
    on(errorCreatingCampaign, (state, { error }: { error: any }) => ({
        ...state,
        campaign: {
            ...state.campaign,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(reset, () => initialState)
);

export function reducer(state: CampaignCreateState | undefined, action: Action) {
    return createCampaignReducer(state, action);
}
