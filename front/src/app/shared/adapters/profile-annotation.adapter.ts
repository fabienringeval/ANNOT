import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { ProfileAnnotation } from '../models/profile-annotation.model';
import { ProfileAdapter } from './profile.adapter';
import { ProfileLabelAdapter } from './profile-label.adapter';

@Injectable({
  providedIn: 'root'
})

export class ProfileAnnotationAdapter extends Adapter implements AdapterInterface<ProfileAnnotation> {
    constructor(
        private profileAdapter: ProfileAdapter,
        private profileLabelAdapter: ProfileLabelAdapter
    ) {
        super();
    }

    adapt(
        {
            id,
            attributes: {},
            relationships: {
                profile,
                profileLabel
            }
        }: {
            id: number,
            attributes: {
                value: number,
                timestamp: Date
            },
            relationships: {
                profile: { data: { type: 'profile', id: number } },
                profileLabel: { data: { type: 'profileLabel', id: number } }
            }
        },
        included
    ): ProfileAnnotation {
        return {
            id,
            profile: this.buildRelations(profile, included, this.profileAdapter),
            label: this.buildRelations(profileLabel, included, this.profileLabelAdapter),
            value: 0
        };
    }
}
