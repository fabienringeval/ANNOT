import { createAction, props } from '@ngrx/store';
import { EmotionalAnalysisAnnotation, User } from 'src/app/shared/models';
import { ProfileAnnotation } from 'src/app/shared/models/profile-annotation.model';
import {EmotionalSummaryAnnotation} from '../../../models/emotional-summary-annotation';

/**
 * Add emotional analysis
 */

export const addingEmotionalAnalysisAnnotations = createAction(
    '[Annotation] Adding emotional analysis annotation',
    props<{ audio, annotations: { emotionId: number, annotations: { value: number, timestamp: Date }[] } [] }>()
);

export const successAddingEmotionalAnalysisAnnotations = createAction(
    '[Annotation] Success adding emotional analysis annotations',
    props<{ emotionalAnnotations: EmotionalAnalysisAnnotation[][] }>()
);

export const errorAddingEmotionalAnalysisAnnotations = createAction(
    '[Annotation] Error adding emotional analysis annotations',
    props<{ error: object }>()
);

/**
 * Add summary
 */

export const addingEmotionalSummaryAnnotations = createAction(
    '[Annotation] Adding emotional summary annotation',
    props<{ audioId: number, emotionId: number, value: number}>()
);

export const successAddingEmotionalSummaryAnnotations = createAction(
    '[Annotation] Success adding emotional summary annotations',
    props<{ emotionalSummaryAnnotations: EmotionalSummaryAnnotation[] }>()
);

export const errorAddingEmotionalSummaryAnnotations = createAction(
    '[Annotation] Error adding emotional summary annotations',
    props<{ error: object }>()
);

/**
 * Add profiles
 */

export const addingProfileAnnotations = createAction(
    '[Annotation] Adding profile annotation',
    props<{ audioId: number, profiles: { profileId: number, labelId: number, value: number }[] }>()
);

export const successAddingProfileAnnotations = createAction(
    '[Annotation] Success adding profile annotation',
    props<{ profiles: ProfileAnnotation[] }>()
);

export const errorAddingProfileAnnotations = createAction(
    '[Annotation] Error adding profile annotation',
    props<{ error: object }>()
);

/**
 * Reset
 */

export const reset = createAction('[Annotation] Reset');
