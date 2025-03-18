import { Annotation } from './annotation.model';
import { Emotion } from './emotion.model';

export class EmotionalAnalysisAnnotation extends Annotation {
    id: number;
    value: number;
    timestamp: Date;
    emotion: Emotion;
}
