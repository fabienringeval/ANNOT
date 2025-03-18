import { Campaign, Emotion, Audio } from 'src/app/shared/models';

export const featureName = 'campaign';

export interface State {
    campaign: Campaign;
    error: any;
    loading: boolean;
    loaded: boolean;
    emotionList: Emotion[];
    loadingEmotionList: boolean;
    loadedEmotionList: boolean;
    updating: boolean;
    updated: boolean;
    deleting: boolean;
    deleted: boolean;
}

export const initialState: State = {
    campaign: null,
    error: null,
    loading: false,
    loaded: false,
    emotionList: null,
    loadingEmotionList: false,
    loadedEmotionList: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false
};
