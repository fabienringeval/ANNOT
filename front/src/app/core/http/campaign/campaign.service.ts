import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient } from 'src/app/core/clients';
import { Campaign, Audio, Company, Emotion, TimeInterval, User, Upload, Profile, SliderConfiguration } from 'src/app/shared/models';
import { AudioAdapter, CampaignAdapter, UserAdapter, EmotionAdapter, ProfileAdapter, SliderConfigurationAdapter, TimeIntervalAdapter } from 'src/app/shared/adapters'
import { Pagination } from 'src/app/shared/interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
    constructor(
        private httpClient: VianoteApiClient,
        private campaignAdapter: CampaignAdapter,
        private audioAdapter: AudioAdapter,
        private emotionAdapter: EmotionAdapter,
        private profileAdapter: ProfileAdapter,
        private userAdapter: UserAdapter,
        private sliderConfigAdapter: SliderConfigurationAdapter,
        private timeIntervalAdapter: TimeIntervalAdapter
    ) {}

    createCampaign({ 
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
    }: { 
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
    }): Observable<Campaign> {
        let params = { name, companyId: company.id, emotionalAnalysis, audioTranscription }
        if(emotionalAnalysis) {
            params = Object.assign(params, {
                emotions: _.map(emotions, 'id'),
                emotionalAnalysisTimeIntervalId: timeInterval.id,
                emotionalAnalysisSliderConfiguration: {
                    minScale,
                    maxScale,
                    startValue,
                    tickInterval
                }
            })
        }
        
        if(audioTranscription) {
            params = Object.assign(params, {
                audioTranscriptionMaxReviewUsers: maxReviewUsers,
                audioTranscriptionReviewPercentage: reviewPercentage
            })
        }
        
        if(profiles) {
            params = Object.assign(params, { profiles: _.map(profiles, 'id')})
        }
        
        return this.httpClient.Post('v1/campaigns', params).pipe( map(({ data }) =>  this.campaignAdapter.adapt(data)));
    }

    loadCampaign({ campaignId }: { campaignId: number }): Observable<Campaign> {
        return this.httpClient.Get(`v1/campaigns/${campaignId}`).pipe( map(({ data }) =>  this.campaignAdapter.adapt(data)));
    }

    endCampaign({ campaignId }: { campaignId: number }): Observable<void> {
        return this.httpClient.Put(`v1/campaigns/${campaignId}`, { ended: true });
    }

    startCampaign({ campaignId }: { campaignId: number }): Observable<void> {
        return this.httpClient.Put(`v1/campaigns/${campaignId}`, { ended: false });
    }

    deleteCampaign({ campaignId }: { campaignId: number }): Observable<void> {
        return this.httpClient.Delete(`v1/campaigns/${campaignId}`);
    }

    loadCampaignList({ pagination: { page, paginate } }: { pagination?: Pagination } = { pagination: { page: 1, paginate: 25 } }): Observable<{ campaigns: Campaign[], total: number}> {
        return this.httpClient.Get(`v1/campaigns?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...campaigns], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  campaigns: _.map(campaigns, data => this.campaignAdapter.adapt(data)),
                  total
              })
            )
        );
    }

    loadCampaignAudioList(
        { campaignId, pagination: { page, paginate } = { page: 1, paginate: 'all' }, include = [] }:
        { campaignId : number, pagination?: Pagination, include?: string[] }
    ): Observable<{ audios: Audio[], total: number}> {
        let params = new HttpParams()
            .append('page', page.toString())
            .append('paginate', paginate.toString());

        if(include.length) {
            params = params.append('include', include.join(','))
        }

        return this.httpClient.Get(`v1/campaigns/${campaignId}/audios`, { params }).pipe(
            map(
                ({ data: [...audios], meta: { total }, included }: {
                    data,
                    meta: { total: number },
                    included?
                }) => ({
                  audios: _.map(audios, data => this.audioAdapter.adapt(data, included)),
                  total
              })
            )
        );
    }

    loadCampaignEmotionList({ campaignId, pagination: { page, paginate } = { page: 1, paginate: 'all' } }: { campaignId : number, pagination?: Pagination }): Observable<{ emotions: Emotion[], total: number}> {
        return this.httpClient.Get(`v1/campaigns/${campaignId}/emotions?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...emotions], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  emotions: _.map(emotions, data => this.emotionAdapter.adapt(data)),
                  total
              })
            )
        );
    }

    loadCampaignProfileList({ campaignId, pagination: { page, paginate } = { page: 1, paginate: 'all' } }: { campaignId : number, pagination?: Pagination }): Observable<{ profiles: Profile[], total: number}> {
        return this.httpClient.Get(`v1/campaigns/${campaignId}/profiles?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...profiles], meta: { total }, included }: {
                    data,
                    meta: { total: number },
                    included?
                }) => ({
                  profiles: _.map(profiles, data => this.profileAdapter.adapt(data, included)),
                  total
              })
            )
        );
    }

    loadCampaignUserList({ campaignId, pagination: { page, paginate } = { page: 1, paginate: 25 } }: { campaignId : number, pagination?: Pagination }): Observable<{ users: User[], total: number}> {
        return this.httpClient.Get(`v1/campaigns/${campaignId}/users?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...users], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  users: _.map(users, data => this.userAdapter.adapt(data)),
                  total
              })
            )
        );
    }

    loadCampaignEmotionalAnalysisSliderConfig({ campaignId }: { campaignId : number }): Observable<SliderConfiguration> {
        return this.httpClient.Get(`v1/campaigns/${campaignId}/emotional-analysis-slider-configuration`).pipe(
            map(
                ({ data }: { data }) => this.sliderConfigAdapter.adapt(data)
            )
        );
    }

    loadCampaignEmotionalAnalysisTimeInterval({ campaignId }: { campaignId : number }): Observable<TimeInterval> {
        return this.httpClient.Get(`v1/campaigns/${campaignId}/emotional-analysis-time-interval`).pipe(
            map(
                ({ data }: { data }) => this.timeIntervalAdapter.adapt(data)
            )
        );
    }

    addAudios({ campaignId, uploads }: { campaignId : number, uploads: Upload[] }): Observable<void> {
        return this.httpClient.Post(`v1/campaigns/${campaignId}/audios`, uploads);
    }

    addUsers({ campaignId, users }: { campaignId : number, users: User[] }): Observable<void> {
        return this.httpClient.Post(`v1/campaigns/${campaignId}/users`, _.map(users, 'id'));
    }

    export( campaignId ){
        return this.httpClient.Get(`v1/campaigns/${campaignId}/export`);

    }
}
