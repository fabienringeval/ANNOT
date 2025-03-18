import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Emotion } from 'src/app/shared/models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmotionAdapter extends Adapter implements AdapterInterface<Emotion> {
    constructor() {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                name,
                description,
                image
            }
        }: {
            id: number,
            attributes: {
                name: string,
                description: string,
                image: string
            }
        }
    ): Emotion {
        return {
            id,
            name,
            description,
            image
        };
    }
}
