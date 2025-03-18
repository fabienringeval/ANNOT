import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    deletingEmotion,
    successDeletingEmotion,
    errorDeletingEmotion
} from './delete-emotion.actions';
import { DeleteButtonState, initialState } from './delete-emotion.state';

export const deleteEmotionButtonFeatureName = 'deleteEmotionButton';

const DeleteButtonReducer = createReducer(
    initialState,
    on(deletingEmotion, (state) => ({
        ...state,
        inProgress: true,
        done: false
    })),
    on(successDeletingEmotion, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorDeletingEmotion, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        error
    }))
);

export function reducer(state: DeleteButtonState | undefined, action: Action) {
    return DeleteButtonReducer(state, action);
}
