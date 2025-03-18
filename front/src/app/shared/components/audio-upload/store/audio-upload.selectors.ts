import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, AudioUploadState } from './audio-upload.state';
import { featureName } from './audio-upload.state';

const getAudioUploadFeatureState = createFeatureSelector<State, AudioUploadState>(featureName);

export const inProgress = createSelector(
  getAudioUploadFeatureState,
  ({ inProgress }) => inProgress
);

export const uploading = createSelector(
  getAudioUploadFeatureState,
  ({ uploading }) => uploading
);

export const associating = createSelector(
  getAudioUploadFeatureState,
  ({ associating }) => associating
);

export const done = createSelector(
  getAudioUploadFeatureState,
  ({ done }) => done
);

export const error = createSelector(
  getAudioUploadFeatureState,
  ({ error }) => error
);