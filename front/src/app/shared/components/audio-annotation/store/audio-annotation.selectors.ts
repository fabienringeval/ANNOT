import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, AudioAnnotationState } from './audio-annotation.state';
import { featureName } from './audio-annotation.state';

const getAudioAnnotationFeatureState = createFeatureSelector<State, AudioAnnotationState>(featureName);

export const getEmotionalAnnotations = createSelector(
  getAudioAnnotationFeatureState,
  ({ emotionalAnnotations }) => emotionalAnnotations
);

export const saved = createSelector(
  getAudioAnnotationFeatureState,
  ({ saved }) => saved
);
