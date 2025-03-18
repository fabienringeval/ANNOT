import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { switchMap, catchError, take, filter } from 'rxjs/operators';
import { AuthService, TokenService } from '../services';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    refreshing = false;
    readyToken$ = new BehaviorSubject<boolean>(false);
    url: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private tokenService: TokenService
        // private route: ActivatedRouteSnapshot
    ) {
        // to get current url instead of root, given by router.url for exemple
        // check for navigationStart to get url before http requests are launched
        this.router.events
        .pipe(
          filter(e => e instanceof NavigationStart)
        )
        .subscribe( (navEnd: NavigationStart) => {
          this.url = navEnd.url;
        });
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // return updated request
        return  next.handle(request).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401 && this.url !== '/login') {
                    return this.handleError(request, next, err);
                } else {
                    return throwError(err);
                }
            })
        );
    }

    handleError(request, next, err): Observable<any> {
        // if /token return 401, refresh token is not valid or login/password is wrong
        // so go clean localstorage and go logging
        if (request.url.includes('token') || request.url.includes('userRole')) {
            this.tokenService.removeTokens();
            this.router.navigate(['login']);
            return throwError(err);
        }

        // no current refresh action, so lets start one
        if (!this.refreshing) {
            this.readyToken$.next(false);
            this.refreshing = true;

            this.authService.refreshToken().subscribe(() => {
                this.readyToken$.next(true);
                this.refreshing = false;
            });
        }

        return this.readyToken$.pipe(
            filter(readyToken => readyToken === true),
            take(1),
            switchMap(() => next.handle(this.addToken(request)))
        );
    }

    addToken(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${this.tokenService.getAccessToken()}` } });
    }
}
