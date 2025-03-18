import * as fromRoot from 'src/app/core/store';
import { Emotion } from 'src/app/shared/models';

export const featureName = 'audioUpload';

export interface AudioUploadState {
    inProgress: boolean;
    uploading: boolean;
    associating: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: AudioUploadState;
}

export const initialState: AudioUploadState = {
    inProgress: false,
    uploading: false,
    associating: false,
    done: false,
    error: null
};
