import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient } from 'src/app/core/clients';
import { Emotion } from 'src/app/shared/models';
import { EmotionAdapter } from 'src/app/shared/adapters'
import { Pagination } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class EmotionService {
    constructor(
        private httpClient: VianoteApiClient,
        private emotionAdapter: EmotionAdapter
    ) {}

    loadEmotion({ emotionId }: { emotionId: number }): Observable<Emotion> {
        return this.httpClient.Get(`v1/emotions/${emotionId}`).pipe( map(({ data }) =>  this.emotionAdapter.adapt(data)));
    }

    deleteEmotion({ emotionId }: { emotionId: number }): Observable<void> {
        return this.httpClient.Delete(`v1/emotions/${emotionId}`);
    }

    loadEmotionList({ pagination: { page, paginate } }: { pagination?: Pagination } = { pagination: { page: 1, paginate: 'all' } }): Observable<{ emotions: Emotion[], total: number}> {
        return this.httpClient.Get(`v1/emotions?page=${page}&paginate=${paginate}`).pipe(
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
    
    createEmotion({ 
        name,
        description = '',
        //image = 'image'
    }: { 
        name: string,
        description: string,
        //image: string
    }): Observable<Emotion> {
        let params = { name, description} //, // image }
        
        return this.httpClient.Post('v1/emotions', params).pipe( map(({ data }) =>  this.emotionAdapter.adapt(data)));
    }
}
