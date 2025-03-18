import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Audio } from 'src/app/shared/models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { EmotionalAnalysisAnnotationAdapter } from './emotional-analysis-annotation.adapter';

@Injectable({
  providedIn: 'root'
})

export class AudioAdapter extends Adapter implements AdapterInterface<Audio> {
    constructor(private emotionalAnalysisAnnotationAdapter: EmotionalAnalysisAnnotationAdapter) {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                name,
                type,
                duration,
                size,
                link,
                annotated
            },
            relationships: {
                emotionalAnalysisAnnotations
            } = {}
        }: {
            id: number,
            attributes: {
                name: string,
                type: string,
                duration: number,
                size: number,
                link: string,
                annotated: boolean
            },
            relationships: {
                emotionalAnalysisAnnotations?: { data: { type: 'emotionalAnalysisAnnotation', id: number }[] }
            }
        },
        included?
    ): Audio {
        return {
            id,
            name,
            type,
            duration,
            size,
            link,
            annotated,
            emotionalAnalysisAnnotations: this.buildRelations(emotionalAnalysisAnnotations, included, this.emotionalAnalysisAnnotationAdapter)
        };
    }
}
