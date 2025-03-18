import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { ProfileLabelAdapter } from './profile-label.adapter';
import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ProfileAdapter extends Adapter implements AdapterInterface<Profile> {
    constructor(private profileLabelAdapter: ProfileLabelAdapter) {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                name,
                description,
            },
            relationships: {
                labels
            } = {}
        }: {
            id: number,
            attributes: {
                name: string,
                description: string,
            },
            relationships: {
                labels?: { data: { type: 'label', id: number, value: number}[] }
            }
        },
        included?
    ): Profile {
        return {
            id,
            name,
            description, value: 0,
            labels: this.buildRelations(labels, included, this.profileLabelAdapter)
        };
    }
}
