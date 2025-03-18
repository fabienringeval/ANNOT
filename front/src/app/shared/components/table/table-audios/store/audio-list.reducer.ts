import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingAudioList,
    successLoadingAudioList,
    errorLoadingAudioList,
    emptyAudioList
} from './audio-list.actions';
import { Audio } from 'src/app/shared/models';
import { LoadAudioListState, initialState } from './audio-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingAudioList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingAudioList, (state, { audios, total }: { audios: Audio[], total: number }) => ({
        ...state,
        audios,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingAudioList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyAudioList, (state) => ({
        ...state,
        users: null,
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadAudioListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
