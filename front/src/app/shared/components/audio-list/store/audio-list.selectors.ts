import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, AudioAnnotationState } from './audio-list.state';
import { featureName } from './audio-list.state';

const getAudioListFeatureState = createFeatureSelector<State, AudioAnnotationState>(featureName);

export const getAudioList = createSelector(
  getAudioListFeatureState,
  ({ audioList }) => audioList
);

export const getTotalAudios = createSelector(
  getAudioListFeatureState,
  ({ totalAudios }) => totalAudios
);
