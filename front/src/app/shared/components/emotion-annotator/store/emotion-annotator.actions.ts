import { createAction, props } from '@ngrx/store';
import { SliderConfiguration, TimeInterval } from 'src/app/shared/models';

/**
 * Load Slider configuration
 */

export const loadingEmotionalAnalysisSliderConfiguration = createAction(
    '[Emotion annotator] loading emotionnal analysis slider configuration',
    props<{ campaignId: number }>()
);

export const successLoadingEmotionalAnalysisSliderConfiguration = createAction(
    '[Emotion annotator] Success loading emotionnal analysis slider configuration',
    props<{ sliderConfig: SliderConfiguration }>()
);

export const errorLoadingEmotionalAnalysisSliderConfiguration = createAction(
    '[Emotion annotator] Error loading emotionnal analysis slider configuration',
    props<{ error: object }>()
);

/**
 * Load time interval
 */

export const loadingEmotionalAnalysisTimeInterval = createAction(
    '[Emotion annotator] loading emotionnal analysis time interval',
    props<{ campaignId: number }>()
);

export const successLoadingEmotionalAnalysisTimeInterval = createAction(
    '[Emotion annotator] Success loading emotionnal analysis time interval',
    props<{ timeInterval: TimeInterval }>()
);

export const errorLoadingEmotionalAnalysisTimeInterval = createAction(
    '[Emotion annotator] Error loading emotionnal analysis time interval',
    props<{ error: object }>()
);

// RESET

export const reset = createAction('[Emotion annotator] Reset');
