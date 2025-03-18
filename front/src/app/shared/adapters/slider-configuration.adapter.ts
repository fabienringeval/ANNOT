import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { SliderConfiguration } from 'src/app/shared/models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SliderConfigurationAdapter extends Adapter implements AdapterInterface<SliderConfiguration> {
    constructor() {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                name,
                minScale,
                maxScale,
                startValue,
                tickInterval
            }
        }: {
            id: number,
            attributes: {
                id: number;
                name: string;
                minScale: number;
                maxScale: number;
                startValue: number;
                tickInterval: number;
            }
        }
    ): SliderConfiguration {
        return {
            id,
            name,
            minScale,
            maxScale,
            startValue,
            tickInterval
        };
    }
}
