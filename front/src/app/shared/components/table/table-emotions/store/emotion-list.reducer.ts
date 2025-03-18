import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingEmotionList,
    successLoadingEmotionList,
    errorLoadingEmotionList,
    emptyEmotionList
} from './emotion-list.actions';
import { Emotion } from 'src/app/shared/models';
import { LoadEmotionListState, initialState } from './emotion-list.state';

export const loadUserListFeatureName = 'loadUserList';

const listUsersReducer = createReducer(
    initialState,
    on(loadingEmotionList, (state) => ({
        ...state,
        inProgress: true
    })),
    on(successLoadingEmotionList, (state, { emotions, total }: { emotions: Emotion[], total: number }) => ({
        ...state,
        emotions,
        total,
        inProgress: false,
        done: true
    })),
    on(errorLoadingEmotionList, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    })),
    on(emptyEmotionList, (state) => ({
        ...state,
        users: null,
        total: null,
        inProgress: false,
        done: false,
        error: null
    }))
);

export function reducer(state: LoadEmotionListState | undefined, action: Action) {
    return listUsersReducer(state, action);
}
