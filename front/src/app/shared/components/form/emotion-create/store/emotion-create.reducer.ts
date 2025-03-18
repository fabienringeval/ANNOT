import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    creatingEmotion,
    successCreatingEmotion,
    errorCreatingEmotion
} from './emotion-create.actions';
import { Emotion } from 'src/app/shared/models';
import { EmotionCreateState, initialState } from './emotion-create.state';

export const loadEmotionListFeatureName = 'loadEmotionList';

const createEmotionReducer = createReducer(
    initialState,
    on(creatingEmotion, (state) => ({
        ...state,
        timeIntervals: null,
        inProgress: true,
        done: false
    })),
    on(successCreatingEmotion, (state, { emotion }: { emotion: Emotion }) => ({
        ...state,
        emotion,
        inProgress: false,
        done: true
    })),
    on(errorCreatingEmotion, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: EmotionCreateState | undefined, action: Action) {
    return createEmotionReducer(state, action);
}
