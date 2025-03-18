import { EmotionalAnalysisAnnotation } from './emotional-analysis-annotation.model';

export class Audio {
    id: number;
    name: string;
    type: string;
    duration: number;
    size: Number;
    link: string;
    emotionalAnalysisAnnotations: EmotionalAnalysisAnnotation[];
    annotated?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
