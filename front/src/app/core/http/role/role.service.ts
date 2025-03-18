import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/core/services';
import { AccessManagerClient } from '../../clients';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
    constructor(
        private tokenService: TokenService,
        private accessManagerClient: AccessManagerClient
    ) {}

    getSelfRoles(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`)
        };
        return this.accessManagerClient.Get( `users/role`, httpOptions).pipe(map((
                { services }: { services: {
                    serviceId: string,
                    serviceName: string,
                    role: ('ROLE_AGENT' | 'ROLE_MANAGER' | 'ROLE_ADMIN' | 'ROLE_SUPERADMIN')[],
                    module: {
                        name: string,
                        crud: ('C' | 'R' | 'U' | 'D')[]
                    } 
                }[] }) => {
                    const currentService = _.find(services, service => service.serviceId === environment.service.id);
                    return {
                        roles: currentService ? currentService.role : null,
                        modules: currentService ? currentService.module : null
                    };
                }
        ));
    }
}
