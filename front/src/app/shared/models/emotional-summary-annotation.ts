import {Annotation} from './annotation.model';
import {Emotion} from './emotion.model';

export class EmotionalSummaryAnnotation extends Annotation {
    id: number;
    value: number;
    emotion: Emotion;
}
