import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { TimeInterval } from 'src/app/shared/models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimeIntervalAdapter extends Adapter implements AdapterInterface<TimeInterval> {
    constructor() {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                label,
                value
            }
        }: {
            id: number,
            attributes: {
                label: string,
                value: number
            }
        }
    ): TimeInterval {
        return {
            id,
            label,
            value
        };
    }
}
