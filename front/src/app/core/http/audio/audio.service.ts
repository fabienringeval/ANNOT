import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient } from 'src/app/core/clients';
import { Audio } from 'src/app/shared/models';
import { AudioAdapter, EmotionalAnalysisAnnotationAdapter } from 'src/app/shared/adapters';
import { Pagination } from 'src/app/shared/interfaces';
import { EmotionalAnalysisAnnotation } from 'src/app/shared/models/emotional-analysis-annotation.model';
import { ProfileAnnotationAdapter } from 'src/app/shared/adapters/profile-annotation.adapter';
import { ProfileAnnotation } from 'src/app/shared/models/profile-annotation.model';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {EmotionalSummaryAnnotation} from '../../../shared/models/emotional-summary-annotation';

@Injectable({
  providedIn: 'root'
})

export class AudioService {
    constructor(
        private httpClient: VianoteApiClient,
        private http: HttpClient,
        private audioAdapter: AudioAdapter,
        private emotionalAnalysisAnnotationAdapter: EmotionalAnalysisAnnotationAdapter,
        private profileAnnotationAdapter: ProfileAnnotationAdapter
    ) {}

    loadAudio({ audioId }: { audioId: number }): Observable<Audio> {
        return this.httpClient.Get(`v1/audios/${audioId}`).pipe( map(({ data }) =>  this.audioAdapter.adapt(data)));
    }

    deleteAudio({ audioId }: { audioId: number }): Observable<void> {
        return this.httpClient.Delete(`v1/audios/${audioId}`);
    }


    serveAudioEndPoint(audioId: number, jwt: string): string {
        return this.httpClient.GetUrl() + `/v1/audios/${audioId}/serve?jwt=${jwt}`;
    }

    loadAudioList({ pagination: { page, paginate } }: { pagination?: Pagination } = { pagination: { page: 1, paginate: 25 } }): Observable<{ audios: Audio[], total: number}> {
        return this.httpClient.Get(`v1/audios?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...audios], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  audios: _.map(audios, data => this.audioAdapter.adapt(data)),
                  total
              })
            )
        );
    }

    addEmotionAnnotations({ audioId, emotionId, annotations }: { audioId: number, emotionId: number, annotations: {  value: number, timestamp: Date }[] }): Observable<EmotionalAnalysisAnnotation[]> {

        const resultVal = this.httpClient.Post(`v1/audios/${audioId}/emotions/${emotionId}/annotations`, annotations);
        return resultVal.pipe(
            map(
                ({ data: [...annotations], included }: {
                    data,
                    included
                }) => _.map(annotations, data => this.emotionalAnalysisAnnotationAdapter.adapt(data, included))
            )
        );

    }

    nAddEmotionAnnotation(audioId, emotionId, annotations): Observable<void> {
        const url = `${environment.api.https ? 'https' : 'http'}://${environment.api.url}:${environment.api.port}`;
        const curl = url + '/' + `v1/audios/${audioId}/emotions/${emotionId}/annotations`;
        return this.http.post<void>(curl, annotations);

    }

    addEmotionSummary(audioId, emotionId, summaries): Observable<void> {
        const url = `${environment.api.https ? 'https' : 'http'}://${environment.api.url}:${environment.api.port}`;
        const curl = url + '/' + `v1/audios/${audioId}/emotions/${emotionId}/summary`;
        console.log(summaries);
        return this.http.post<void>(curl, summaries);
    }

    addComment(audioId, comments): Observable<void> {
        const url = `${environment.api.https ? 'https' : 'http'}://${environment.api.url}:${environment.api.port}`;
        const curl = url + '/' + `v1/audios/${audioId}/comments`;
        return this.http.post<void>(curl, comments);

    }


    addProfileAnnotations({ audioId, profiles }: { audioId: number, profiles: {  profileId: number, labelId: number, value: number}[] }): Observable<ProfileAnnotation[]> {
        return this.httpClient.Post(`v1/audios/${audioId}/profiles`, profiles).pipe(
            map(
                ({ data: [...profiles], included }: {
                    data,
                    included
                }) => _.map(profiles, data => this.profileAnnotationAdapter.adapt(data, included))
            )
        );
    }
}
