import * as fromRoot from 'src/app/core/store';
import { EmotionalAnalysisAnnotation } from 'src/app/shared/models';
import { ProfileAnnotation } from 'src/app/shared/models/profile-annotation.model';

export const featureName = 'audioAnnotation';

export interface AudioAnnotationState {
    emotionalAnnotations: EmotionalAnalysisAnnotation[][];
    addingAnnotations: boolean;
    addedAnnotations: boolean;
    profiles: ProfileAnnotation[];
    addingProfileAnnotations: boolean;
    addedProfileAnnotations: boolean;
    total: number;
    error: any;
    saved: boolean;
}

export interface State extends fromRoot.State {
    [featureName]: State;
}

export const initialState: AudioAnnotationState = {
    emotionalAnnotations: null,
    addingAnnotations: false,
    addedAnnotations: false,
    profiles: null,
    addingProfileAnnotations: false,
    addedProfileAnnotations: false,
    total: null,
    error: null,
    saved: false
};
