import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingCampaign,
    successLoadingCampaign,
    errorLoadingCampaign,
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList,
    loadingEmotionList,
    successLoadingEmotionList,
    errorLoadingEmotionList,
    loadingSliderConfig,
    successLoadingSliderConfig,
    errorLoadingSliderConfig,
    loadingTimeInterval,
    successLoadingTimeInterval,
    errorLoadingTimeInterval,
    reset
} from './campaign-sheet.actions';
import { Campaign, Profile, Emotion, SliderConfiguration, TimeInterval } from 'src/app/shared/models';
import { CampaignSheetState, initialState } from './campaign-sheet.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingCampaign, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingCampaign, (state, { campaign }: { campaign: Campaign }) => ({
        ...state,
        campaign,
        inProgress: false,
        done: true
    })),
    on(errorLoadingCampaign, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(loadingProfileList, (state) => ({
        ...state,
        profiles: {
            list: null,
            inProgress: true,
            done: false
        }
    })),
    on(successLoadingProfileList, (state, { profiles }: { profiles: Profile[] }) => ({
        ...state,
        profiles: {
            list: profiles,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingProfileList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(loadingEmotionList, (state) => ({
        ...state,
        emotions: {
            list: null,
            inProgress: true,
            done: false
        }
    })),
    on(successLoadingEmotionList, (state, { emotions }: { emotions: Emotion[] }) => ({
        ...state,
        emotions: {
            list: emotions,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingEmotionList, (state, { error }: { error: any }) => ({
        ...state,
        error,
        emotions: {
            ...state.emotions,
            list: false,
            inProgress: false
        }
    })),    
    on(loadingSliderConfig, (state) => ({
        ...state,
        sliderConfig: {
            config: null,
            inProgress: true,
            done: false
        }
    })),
    on(successLoadingSliderConfig, (state, { sliderConfig }: { sliderConfig: SliderConfiguration }) => ({
        ...state,
        sliderConfig: {
            config: sliderConfig,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingSliderConfig, (state, { error }: { error: any }) => ({
        ...state,
        sliderConfig: {
            ...state.sliderConfig,
            list: false,
            inProgress: false
        }
    })),
    on(loadingTimeInterval, (state) => ({
        ...state,
        timeInterval: {
            interval: null,
            inProgress: true,
            done: false
        }
    })),
    on(successLoadingTimeInterval, (state, { timeInterval }: { timeInterval: TimeInterval }) => ({
        ...state,
        timeInterval: {
            interval: timeInterval,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingTimeInterval, (state, { error }: { error: any }) => ({
        ...state,
        error,
        timeInterval: {
            ...state.timeInterval,
            interval: false,
            inProgress: false
        }
    })),
    on(reset, () => initialState)
);

export function reducer(state: CampaignSheetState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
