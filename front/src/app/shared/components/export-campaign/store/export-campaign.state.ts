import * as fromRoot from 'src/app/core/store';
import { Audio } from 'src/app/shared/models';

export const featureName = 'exportCampaign';

export interface ExportCampaignState {
    audios: Audio[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: ExportCampaignState;
}

export const initialState: ExportCampaignState = {
    audios: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
