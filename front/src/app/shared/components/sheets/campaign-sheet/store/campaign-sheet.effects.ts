import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingCampaign,
    successLoadingCampaign,
    errorLoadingCampaign,
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList,
    loadingEmotionList,
    successLoadingEmotionList,
    errorLoadingEmotionList,
    loadingSliderConfig,
    successLoadingSliderConfig,
    errorLoadingSliderConfig,
    loadingTimeInterval,
    successLoadingTimeInterval,
    errorLoadingTimeInterval
} from './campaign-sheet.actions';
import { CampaignService } from 'src/app/core/http';
import { Campaign, Emotion, Profile, TimeInterval, SliderConfiguration } from 'src/app/shared/models';


@Injectable()
export class LoadCampaignEffects {
    loadingCampaign$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingCampaign),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaign({ campaignId })
                    .pipe(
                        map((campaign: Campaign) => successLoadingCampaign({ campaign })),
                        catchError(error => of(errorLoadingCampaign(error)))
                    )
            )
        )
    );

    loadingProfileList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingProfileList),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaignProfileList({ campaignId })
                    .pipe(
                        map(({ profiles }: { profiles: Profile[] }) => successLoadingProfileList({ profiles })),
                        catchError(error => of(errorLoadingProfileList(error)))
                    )
            )
        )
    );

    loadingEmotionList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingEmotionList),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaignEmotionList({ campaignId })
                    .pipe(
                        map(({ emotions }: { emotions: Emotion[] } ) => successLoadingEmotionList({ emotions })),
                        catchError(error => of(errorLoadingEmotionList(error)))
                    )
            )
        )
    );

    loadingSliderConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingSliderConfig),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaignEmotionalAnalysisSliderConfig({ campaignId })
                    .pipe(
                        map((sliderConfig: SliderConfiguration ) => successLoadingSliderConfig({ sliderConfig })),
                        catchError(error => of(errorLoadingSliderConfig(error)))
                    )
            )
        )
    );

    loadingTimeInterval$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingTimeInterval),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaignEmotionalAnalysisTimeInterval({ campaignId })
                    .pipe(
                        map((timeInterval: TimeInterval ) => successLoadingTimeInterval({ timeInterval })),
                        catchError(error => of(errorLoadingTimeInterval(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
