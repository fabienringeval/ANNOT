import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { EmotionalAnalysisAnnotation } from '../models';
import { EmotionAdapter } from './emotion.adapter';

@Injectable({
  providedIn: 'root'
})

export class EmotionalAnalysisAnnotationAdapter extends Adapter implements AdapterInterface<EmotionalAnalysisAnnotation> {
    constructor(private emotionAdapter: EmotionAdapter) {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                value,
                timestamp
            },
            relationships: { emotion }
        }: {
            id: number,
            attributes: {
                value: number,
                timestamp: Date
            },
            relationships: {
                emotion: { data: { type: 'emotion', id: number } }
            }
        },
        included
    ): EmotionalAnalysisAnnotation {
        return {
            id,
            value,
            timestamp,
            emotion: this.buildRelations(emotion, included, this.emotionAdapter) 
        };
    }
}
