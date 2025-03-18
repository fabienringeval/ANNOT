import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    addingAudios,
    successAddingAudios,
    errorAddingAudios,
    uploadingAudios,
    successUploadingAudios,
    errorUploadingAudios,
    reset
} from './audio-upload.actions';
import { AudioUploadState, initialState } from './audio-upload.state';

const audioUploadReducer = createReducer(
    initialState,
    // uploading audios
    on(uploadingAudios, (state) => ({
        ...state,
        inProgress: true,
        uploading: true,
        done: false,
        error: null
    })),
    on(successUploadingAudios, (state) => ({
        ...state,
        uploading: false
    })),
    on(errorUploadingAudios, (state, { error }) => ({
        ...state,
        inProgress: false,
        uploading: false,
        error
    })),
    // adding audios
    on(addingAudios, (state) => ({
        ...state,
        associating: true
    })),
    on(successAddingAudios, (state) => ({
        ...state,
        inProgress: false,
        associating: false,
        done: true
    })),
    on(errorAddingAudios, (state, { error }) => ({
        ...state,
        inProgress: false,
        associating: false,
        error
    })),
    
    // RESET
    on(reset, () => (initialState))
);

export function reducer(state: AudioUploadState | undefined, action: Action) {
    return audioUploadReducer(state, action);
}
