import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

    constructor(private jwtHelper: JwtHelperService) {}

    decodeAccessToken() {
        const accessToken = this.getAccessToken();
        if (this.isValidToken(accessToken)) {
            return {
                accessToken,
                user: this.jwtHelper.decodeToken(accessToken).user
            };
        }
        throw new Error('no token');
    }

    removeTokens(): void {
        this.removeAccessToken();
        this.removeRefreshToken();
    }

    // Access Token, short validity
    saveAccessToken(token): void {
        localStorage.setItem('access_token', token);
    }

    removeAccessToken(): void {
        localStorage.removeItem('access_token');
    }

    getAccessToken(): string {
        return localStorage.getItem('access_token');
    }

    // Refresh Token, long validity
    saveRefreshToken(token): void {
        localStorage.setItem('refresh_token', token);
    }

    removeRefreshToken(): void {
        localStorage.removeItem('refresh_token');
    }

    getRefreshToken(): string {
        return localStorage.getItem('refresh_token');
    }

    // Refresh Token, long validity
    saveTokens(accessToken, refreshToken): void {
        this.saveAccessToken(accessToken)
        this.saveRefreshToken(refreshToken)
    }

    isValidToken(token) {
        return !this.jwtHelper.isTokenExpired(token);
    }

    hasValidRefreshToken() {
        console.log(this.getRefreshToken())
        const refreshToken = this.getRefreshToken();
        return this.isValidToken(refreshToken);
    }
}
