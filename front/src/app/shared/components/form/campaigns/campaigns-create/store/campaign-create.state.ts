import * as fromRoot from 'src/app/core/store';
import { Emotion, TimeInterval, Campaign, Profile, Company } from 'src/app/shared/models';

export const featureName = 'campaignCreate';

export interface CampaignCreateState {
    emotionList: {
        emotions: Emotion[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    companyList: {
        companies: Company[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    profileList: {
        profiles: Profile[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    timeIntervalList: {
        timeIntervals: TimeInterval[];
        inProgress: boolean;
        done: boolean;
        error: any;
    },
    campaign: {
        campaign: Campaign;
        inProgress: boolean;
        done: boolean;
        error: any;
    }
}

export interface State extends fromRoot.State {
    [featureName]: CampaignCreateState;
}

export const initialState: CampaignCreateState = {
    emotionList: {
        emotions: null,
        inProgress: false,
        done: false,
        error: null
    },
    companyList: {
        companies: null,
        inProgress: false,
        done: false,
        error: null
    },
    profileList: {
        profiles: null,
        inProgress: false,
        done: false,
        error: null
    },
    timeIntervalList: {
        timeIntervals: null,
        inProgress: false,
        done: false,
        error: null
    },
    campaign: {
        campaign: null,
        inProgress: false,
        done: false,
        error: null
    }
};
