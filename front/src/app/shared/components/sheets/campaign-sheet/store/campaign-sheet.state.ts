import * as fromRoot from 'src/app/core/store';
import { Campaign, Emotion, Profile, SliderConfiguration, TimeInterval } from 'src/app/shared/models';

export const featureName = 'campaignSheet';

export interface CampaignSheetState {
    campaign: Campaign;
    inProgress: boolean;
    done: boolean;
    error: any;
    sliderConfig: {
        config: SliderConfiguration;
        inProgress: boolean;
        done: boolean;
    }
    timeInterval: {
        interval: TimeInterval;
        inProgress: boolean;
        done: boolean;
    }
    emotions: {
        list: Emotion[];
        inProgress: boolean;
        done: boolean;
    }
    profiles: {
        list: Profile[];
        inProgress: boolean;
        done: boolean;
    }
}

export interface State extends fromRoot.State {
    [featureName]: CampaignSheetState;
}

export const initialState: CampaignSheetState = {
    campaign: null,
    inProgress: false,
    done: false,
    error: null,
    sliderConfig: {
        config: null,
        inProgress: false,
        done: false
    },
    timeInterval: {
        interval: null,
        inProgress: false,
        done: false
    },
    emotions: {
        list: null,
        inProgress: false,
        done: false
    },
    profiles: {
        list: null,
        inProgress: false,
        done: false
    }
};
