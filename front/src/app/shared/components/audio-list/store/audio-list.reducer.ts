import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingAudios,
    successLoadingAudios,
    errorLoadingAudios
} from './audio-list.actions';
import { AudioAnnotationState, initialState } from './audio-list.state';
import { Audio } from 'src/app/shared/models';

const audioAnnotationReducer = createReducer(
    initialState,
    on(loadingAudios, (state) => ({
        ...state,
        error: false,
        loadingAudioList: true
    })),
    on(successLoadingAudios, (state, { audios, total }: { audios: Audio[], total: number }) => ({
        ...state,
        audioList: audios,
        totalAudios: total,
        loadingEmotionList: false,
        loadedEmotionList: true
    })),
    on(errorLoadingAudios, (state, { error }) => ({
        ...state,
        loadingEmotionList: false,
        error
    }))
);

export function reducer(state: AudioAnnotationState | undefined, action: Action) {
    return audioAnnotationReducer(state, action);
}
