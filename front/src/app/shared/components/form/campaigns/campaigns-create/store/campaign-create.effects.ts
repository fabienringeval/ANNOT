import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingEmotionList,
    successLoadingEmotionList,
    errorLoadingEmotionList,
    loadingCompanyList,
    successLoadingCompanyList,
    errorLoadingCompanyList,
    loadingTimeIntervalList,
    successLoadingTimeIntervalList,
    errorLoadingTimeIntervalList,
    creatingCampaign,
    successCreatingCampaign,
    errorCreatingCampaign,
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList
} from './campaign-create.actions';
import { Emotion, Company, TimeInterval, Campaign, Profile } from 'src/app/shared/models';
import { CompanyService, EmotionService, TimeIntervalService, CampaignService, ProfileService } from 'src/app/core/http';


@Injectable()
export class LoadCampaignEffects {
    loadingEmotionList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingEmotionList),
            exhaustMap(
                () => this.emotionService.loadEmotionList()
                    .pipe(
                        map(({ emotions }: { emotions: Emotion[] }) => successLoadingEmotionList({ emotions })),
                        catchError(error => of(errorLoadingEmotionList(error)))
                    )
            )
        )
    );

    loadingCompanyList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingCompanyList),
            exhaustMap(
                () => this.companyService.loadCompanyList()
                    .pipe(
                        map(({ companies }: { companies: Company[] }) => successLoadingCompanyList({ companies })),
                        catchError(error => of(errorLoadingCompanyList(error)))
                    )
            )
        )
    );

    loadingProfileList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingProfileList),
            exhaustMap(
                () => this.profileService.loadProfileList()
                    .pipe(
                        map(({ profiles }: { profiles: Profile[] }) => successLoadingProfileList({ profiles })),
                        catchError(error => of(errorLoadingProfileList(error)))
                    )
            )
        )
    );

    loadingTimeIntervalList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingTimeIntervalList),
            exhaustMap(
                () => this.timeIntervalService.loadTimeIntervalList()
                    .pipe(
                        map(({ timeIntervals }: { timeIntervals: TimeInterval[] }) => successLoadingTimeIntervalList({ timeIntervals })),
                        catchError(error => of(errorLoadingTimeIntervalList(error)))
                    )
            )
        )
    );

    creatingCampaign$ = createEffect(() =>
        this.actions$.pipe(
            ofType(creatingCampaign),
            exhaustMap(
                (
                    {
                        name,
                        company,
                        emotionalAnalysis,
                        emotions,
                        profiles,
                        timeInterval,
                        minScale,
                        maxScale,
                        startValue,
                        tickInterval,
                        audioTranscription,
                        maxReviewUsers,
                        reviewPercentage
                    }:
                    {
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
                    }
                ) => this.campaignService.createCampaign({
                        name,
                        company,
                        emotionalAnalysis,
                        emotions,
                        profiles,
                        timeInterval,
                        minScale,
                        maxScale,
                        startValue,
                        tickInterval,
                        audioTranscription,
                        maxReviewUsers,
                        reviewPercentage
                    })
                    .pipe(
                        map((campaign: Campaign) => successCreatingCampaign({ campaign })),
                        catchError(error => of(errorCreatingCampaign(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private emotionService: EmotionService,
        private companyService: CompanyService,
        private timeIntervalService: TimeIntervalService,
        private campaignService: CampaignService,
        private profileService: ProfileService
    ) {}
}
