import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    deletingAudio,
    successDeletingAudio,
    errorDeletingAudio
} from './delete-audio.actions';
import { DeleteButtonState, initialState } from './delete-audio.state';

export const deleteAudioButtonFeatureName = 'deleteAudioButton';

const DeleteButtonReducer = createReducer(
    initialState,
    on(deletingAudio, (state) => ({
        ...state,
        inProgress: true,
        done: false
    })),
    on(successDeletingAudio, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorDeletingAudio, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: DeleteButtonState | undefined, action: Action) {
    return DeleteButtonReducer(state, action);
}
