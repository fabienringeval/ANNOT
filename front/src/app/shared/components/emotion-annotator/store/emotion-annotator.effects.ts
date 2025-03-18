import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    loadingEmotionalAnalysisSliderConfiguration,
    successLoadingEmotionalAnalysisSliderConfiguration,
    errorLoadingEmotionalAnalysisSliderConfiguration,
    loadingEmotionalAnalysisTimeInterval,
    successLoadingEmotionalAnalysisTimeInterval,
    errorLoadingEmotionalAnalysisTimeInterval
} from './emotion-annotator.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CampaignService } from 'src/app/core/http';
import { SliderConfiguration, TimeInterval } from 'src/app/shared/models';

@Injectable()
export class EmotionAnnotatorEffects {

    loadingEmotionalAnalysisSliderConfiguration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingEmotionalAnalysisSliderConfiguration),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.loadCampaignEmotionalAnalysisSliderConfig({ campaignId })
                .pipe(
                    map((sliderConfig: SliderConfiguration) => successLoadingEmotionalAnalysisSliderConfiguration({ sliderConfig })),
                    catchError(error => of(errorLoadingEmotionalAnalysisSliderConfiguration({ error })))
                )
            )
        )
    );

    loadingEmotionalAnalysisTimeInterval$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingEmotionalAnalysisTimeInterval),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.loadCampaignEmotionalAnalysisTimeInterval({ campaignId })
                .pipe(
                    map((timeInterval: TimeInterval) => successLoadingEmotionalAnalysisTimeInterval({ timeInterval })),
                    catchError(error => of(errorLoadingEmotionalAnalysisTimeInterval({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
