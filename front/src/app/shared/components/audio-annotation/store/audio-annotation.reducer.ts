import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    addingEmotionalAnalysisAnnotations,
    successAddingEmotionalAnalysisAnnotations,
    errorAddingEmotionalAnalysisAnnotations,
    addingProfileAnnotations,
    successAddingProfileAnnotations,
    errorAddingProfileAnnotations,
    reset
} from './audio-annotation.actions';
import { EmotionalAnalysisAnnotation } from 'src/app/shared/models';
import { AudioAnnotationState, initialState } from './audio-annotation.state';
import { ProfileAnnotation } from 'src/app/shared/models/profile-annotation.model';

const audioAnnotationReducer = createReducer(
    initialState,
    on(addingEmotionalAnalysisAnnotations, (state) => ({
        ...state,
        error: false,
        addingAnnotations: true,
        addedAnnotations: false
    })),
    on(successAddingEmotionalAnalysisAnnotations, (state, { emotionalAnnotations }: { emotionalAnnotations: EmotionalAnalysisAnnotation[][] }) => ({
        ...state,
        emotionalAnnotations,
        addingAnnotations: false,
        addedAnnotations: true,
        saved: !state.addingProfileAnnotations || state.addedProfileAnnotations
    })),
    on(errorAddingEmotionalAnalysisAnnotations, (state, { error }) => ({
        ...state,
        addingAnnotations: false,
        error
    })),

    on(addingProfileAnnotations, (state) => ({
        ...state,
        error: false,
        addingAnnotations: true,
        addedAnnotations: false
    })),
    on(successAddingProfileAnnotations, (state, { profiles }: { profiles: ProfileAnnotation[] }) => ({
        ...state,
        profiles,
        addingProfileAnnotations: false,
        addedProfileAnnotations: true,
        saved: !state.addingAnnotations || state.addedAnnotations
    })),
    on(errorAddingProfileAnnotations, (state, { error }) => ({
        ...state,
        addingAnnotations: false,
        error
    })),
    on(reset, () => (initialState))
);

export function reducer(state: AudioAnnotationState | undefined, action: Action) {
    return audioAnnotationReducer(state, action);
}



// addingProfileAnnotations: false,
// addingAnnotations: false,