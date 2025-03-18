import { createAction, props } from '@ngrx/store';
import { Emotion, Company, TimeInterval, Campaign, Profile } from 'src/app/shared/models';

// Load emotions

export const loadingEmotionList = createAction('[Campaign Create Form] Loading emotions');

export const successLoadingEmotionList = createAction(
    '[Campaign Create Form] Success loading emotions',
    props<{ emotions: Emotion[] }>()
);

export const errorLoadingEmotionList = createAction(
    '[Campaign Create Form] Error loading emotions',
    props<{ error: any }>()
);

// Load companies

export const loadingCompanyList = createAction('[Campaign Create Form] Loading companies');

export const successLoadingCompanyList = createAction(
    '[Campaign Create Form] Success loading companies',
    props<{ companies: Company[] }>()
);

export const errorLoadingCompanyList = createAction(
    '[Campaign Create Form] Error loading companies',
    props<{ error: any }>()
);

// Load time intervals

export const loadingTimeIntervalList = createAction('[Campaign Create Form] Loading time intervals');

export const successLoadingTimeIntervalList = createAction(
    '[Campaign Create Form] Success loading time intervals',
    props<{ timeIntervals: TimeInterval[] }>()
);

export const errorLoadingTimeIntervalList = createAction(
    '[Campaign Create Form] Error loading time intervals',
    props<{ error: any }>()
);

// Load emotions

export const creatingCampaign = createAction(
    '[Campaign Create Form] Creating campaign',
    props<{ 
        name: string,
        company: Company,
        emotionalAnalysis: boolean,
        emotions?: Emotion[],
        profiles?: Profile[],
        timeInterval?: TimeInterval,
        minScale?: number,
        maxScale?: number,
        startValue?: number,
        tickInterval?: number,
        audioTranscription: boolean,
        maxReviewUsers?: number,
        reviewPercentage?: number
    }>()
);

export const successCreatingCampaign = createAction(
    '[Campaign Create Form] Success creating campaign',
    props<{ campaign: Campaign }>()
);

export const errorCreatingCampaign = createAction(
    '[Campaign Create Form] Error creating campaign',
    props<{ error: any }>()
);

// Load profiles

export const loadingProfileList = createAction('[Campaign Create Form] Loading profiles');

export const successLoadingProfileList = createAction(
    '[Campaign Create Form] Success loading profiles',
    props<{ profiles: Profile[] }>()
);

export const errorLoadingProfileList = createAction(
    '[Campaign Create Form] Error loading profiles',
    props<{ error: any }>()
);

// RESET

export const reset = createAction('[Campaign Create Form] RESET');
