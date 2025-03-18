import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { ProfileLabel } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ProfileLabelAdapter extends Adapter implements AdapterInterface<ProfileLabel> {
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
    ): ProfileLabel {
        return {
            id,
            label,
        };
    }
}
