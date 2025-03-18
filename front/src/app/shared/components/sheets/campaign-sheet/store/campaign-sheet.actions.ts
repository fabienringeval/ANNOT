import { createAction, props } from '@ngrx/store';
import { Campaign, Profile, Emotion, TimeInterval, SliderConfiguration } from 'src/app/shared/models';

// Load Campaign

export const loadingCampaign = createAction(
    '[Campaign Sheet] Loading campaign',
    props<{ campaignId: number }>()
);

export const successLoadingCampaign = createAction(
    '[Campaign Sheet] Success loading campaign',
    props<{ campaign: Campaign }>()
);

export const errorLoadingCampaign = createAction(
    '[Campaign Sheet] Error loading campaign',
    props<{ error: any }>()
);

// Load Profiles

export const loadingProfileList = createAction(
    '[Campaign Sheet] Loading profile list',
    props<{ campaignId: number }>()
);

export const successLoadingProfileList = createAction(
    '[Campaign Sheet] Success loading profile list',
    props<{ profiles: Profile[] }>()
);

export const errorLoadingProfileList = createAction(
    '[Campaign Sheet] Error loading profile list',
    props<{ error: any }>()
);

// Load Emotions

export const loadingEmotionList = createAction(
    '[Campaign Sheet] Loading emotion list',
    props<{ campaignId: number }>()
);

export const successLoadingEmotionList = createAction(
    '[Campaign Sheet] Success loading emotion list',
    props<{ emotions: Emotion[] }>()
);

export const errorLoadingEmotionList = createAction(
    '[Campaign Sheet] Error loading emotion list',
    props<{ error: any }>()
);

// Load slider config

export const loadingSliderConfig = createAction(
    '[Campaign Sheet] Loading slider config',
    props<{ campaignId: number }>()
);

export const successLoadingSliderConfig = createAction(
    '[Campaign Sheet] Success loading slider config',
    props<{ sliderConfig: SliderConfiguration }>()
);

export const errorLoadingSliderConfig = createAction(
    '[Campaign Sheet] Error loading slider config',
    props<{ error: any }>()
);

// Load time interval

export const loadingTimeInterval = createAction(
    '[Campaign Sheet] Loading time interval',
    props<{ campaignId: number }>()
);

export const successLoadingTimeInterval = createAction(
    '[Campaign Sheet] Success loading time interval',
    props<{ timeInterval: TimeInterval }>()
);

export const errorLoadingTimeInterval = createAction(
    '[Campaign Sheet] Error loading time interval',
    props<{ error: any }>()
);

// reset

export const reset = createAction('[Campaign Sheet] Reset');
