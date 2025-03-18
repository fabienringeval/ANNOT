import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient } from 'src/app/core/clients';
import { Profile } from 'src/app/shared/models';
import { ProfileAdapter } from 'src/app/shared/adapters'
import { Pagination } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
    constructor(
        private httpClient: VianoteApiClient,
        private profileAdapter: ProfileAdapter,
    ) {}

    createProfile({ 
        name,
        description,
        labels
    }: { 
        name: string,
        description: string,
        labels?: string[]
    }): Observable<Profile> {
        let params = { name, description, labels: _.map(labels, label => ({ label })) }
        return this.httpClient.Post('v1/profiles', params);
    }

    loadProfile({ profileId }: { profileId: number }): Observable<Profile> {
        return this.httpClient.Get(`v1/profiles/${profileId}`).pipe( map(({ data }) =>  this.profileAdapter.adapt(data)));
    }

    deleteProfile({ profileId }: { profileId: number }): Observable<void> {
        return this.httpClient.Delete(`v1/profiles/${profileId}`);
    } 

    loadProfileList({ pagination: { page, paginate } }: { pagination?: Pagination } = { pagination: { page: 1, paginate: 25 } }): Observable<{ profiles: Profile[], total: number}> {
        return this.httpClient.Get(`v1/profiles?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...profiles], meta: { total }, included }: {
                    data,
                    meta: { total: number },
                    included
                }) => ({
                  profiles: _.map(profiles, data => this.profileAdapter.adapt(data, included)),
                  total
              })
            )
        );
    }
}
