import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Campaign } from 'src/app/shared/models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CampaignAdapter extends Adapter implements AdapterInterface<Campaign> {
    constructor() {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                name,
                emotionalAnalysis,
                audioTranscription,
                ended
            },
            meta: {
                audioCount,
                averageAudioDuration,
                achievedProcessCount
            }
        }: {
            id: number,
            attributes: {
                name: string,
                emotionalAnalysis: boolean,
                audioTranscription: boolean,
                ended: boolean
            },
            meta: {
                audioCount: number,
                averageAudioDuration: number,
                achievedProcessCount: number
            }
        }
    ): Campaign {
        return {
            id,
            name,
            ended,
            emotionalAnalysis,
            audioTranscription,
            audioCount,
            averageAudioDuration,
            achievedProcessCount
        };
    }
}
