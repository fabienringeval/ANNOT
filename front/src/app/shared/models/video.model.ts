import {EmotionalAnalysisAnnotation} from './emotional-analysis-annotation.model';

export class Video {
    id: number;
    name: string;
    type: string;
    duration: number;
    size: Number;
    link: String;
    emotionalAnalysisAnnotations: EmotionalAnalysisAnnotation[];
    annotated?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
