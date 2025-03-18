export class Campaign {
    id: number;
    name: string;
    ended: boolean;
    emotionalAnalysis: boolean;
    audioTranscription: boolean;
    audioCount: number;
    averageAudioDuration: number;
    achievedProcessCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
