import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccessManagerClient } from '../../clients';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    constructor(private accessManagerClient: AccessManagerClient) {}

    login(email: string, password: string): Observable<{ access_token, refresh_token, user }> {
       return this.accessManagerClient.Post( `auth/login`, { email: email, password })
            .pipe(
                map((
                    { access_token, refresh_token, user }:
                    { access_token, refresh_token, user? }
                ) => ({ access_token, refresh_token, user }))
            );
    }

    logout(token) {
        return this.accessManagerClient.Delete(`auth/logout`);
    }

    refreshToken(token): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        };

        return this.accessManagerClient.Get(`auth/access-tokens`, httpOptions)
            .pipe(
                map(({ access_token }: { access_token }) => ({ access_token }))
            );
    }
}
