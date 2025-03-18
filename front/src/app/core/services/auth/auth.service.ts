import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { TokenService } from '../token/token.service';
import { AuthService as HttpAuthService } from 'src/app/core/http/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(
        private tokenService: TokenService,
        private authService: HttpAuthService
    ) {}

    isAuthenticated() {
        return this.tokenService.hasValidRefreshToken();
    }

    login(email: string, password: string): Observable<{ access_token: string, refresh_token: string }> {
        return this.authService.login(email, password).pipe(
            map(({ access_token, refresh_token }: { access_token, refresh_token }) => {
                    return { access_token, refresh_token }
            })
        );
    }

    logout(): Observable<any> {
        return this.authService.logout(this.tokenService.getRefreshToken());
    }
 
    refreshToken(): Observable<void> {
        return this.authService.refreshToken(this.tokenService.getRefreshToken()).pipe(
            map(({ access_token }: { access_token }) => this.tokenService.saveAccessToken(access_token))
        );
    }
}
