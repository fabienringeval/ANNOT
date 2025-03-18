import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient, AccessManagerClient } from 'src/app/core/clients';
import { User, Company } from 'src/app/shared/models';
import { UserAdapter } from 'src/app/shared/adapters'
import { Pagination } from 'src/app/shared/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/core/services';


@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(
        private httpClient: VianoteApiClient,
        private accessManagerClient: AccessManagerClient,
        private userAdapter: UserAdapter,
        private tokenService: TokenService,

    ) {}

    loadInfos(): Observable<{ firstName: string, lastName: string }> {
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`)
        };
        return this.accessManagerClient.Get(`users/info`, httpOptions).pipe(map(
            ({ profil: { firstName, lastName }}: { profil: { firstName: string, lastName: string }}) => {
                return ({ firstName, lastName })
            }
        ));
    }

    loadUser(id: number | 'me' = 'me', { include }: { include?: string[] } = {}): Observable<User> {
        return this.httpClient.Get(`v1/users/${id}`).pipe( map(({ data }) =>  this.userAdapter.adapt(data)));
    }

    loadSelf(): Observable<User> {
        return this.loadUser('me')
    }

    loadUserList({ pagination: { page, paginate } = { page: 1, paginate: 25 } }: { pagination?: Pagination }): Observable<{ users: User[], total: number}> {
        return this.httpClient.Get(`v1/users?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...users], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  users: _.map(users, data => this.userAdapter.adapt(data)),
                  total
              })
            )
        );
    }
    
    createUser({ 
        firstName,
        lastName,
        email,
        company,
        password
    }: { 
        firstName: string,
        lastName: string,
        email: string,
        company: Company,
        password: string
    }): Observable<User> {
        let params = { firstName, lastName, email, companyId: company.id, password }
        
        return this.httpClient.Post('v1/users', params).pipe( map(({ data }) =>  this.userAdapter.adapt(data)));
    }
}
