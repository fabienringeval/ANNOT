import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHandler } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';

// routing
import { AppRoutingModule } from './app-routing.module';

/**
 * Components
 */

import { AppComponent } from './app.component';

/**
 * Http Interceptors
 */

import { RequestInterceptor } from './core/interceptors/http.interceptor';
import { SharedModule } from './shared/shared.module';

/**
 * Http clients
 */

import { 
    VianoteApiClient,
    vianoteApiClientCreator,
    FileManagerClient,
    fileManagerClientCreator,
    AccessManagerClient,
    accessManagerClientCreator
} from './core/clients';


// App store module
import { AppStoreModule } from './core/store/app-store.module';

import { environment } from 'src/environments/environment';

// Error Handler
import { GlobalErrorHandler } from './core/interceptors/globalError.interceptor';

// function returning the access token to jwt module, see config
export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter,
            allowedDomains: [
                environment.api.url + ':' + environment.api.port,
//                environment.accessManager.url + ':' + environment.accessManager.port,
                environment.fileManager.url + ':' + environment.fileManager.port,
            ],
            disallowedRoutes: [
//                environment.accessManager.url + ':' + environment.accessManager.port
                environment.api.url + ':' + environment.api.port + '/' + environment.api.version + '/auth/access-tokens',
                environment.api.url + ':' + environment.api.port + '/' + environment.api.version + '/auth/login'
            ],
            authScheme: 'Bearer '
          }
        }),
        AppStoreModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        // provide new httpClient
        {
            provide: VianoteApiClient,
            useFactory: vianoteApiClientCreator,
            deps: [HttpHandler]
        },
        // provide new httpClient
        {
            provide: FileManagerClient,
            useFactory: fileManagerClientCreator,
            deps: [HttpHandler]
        },
        // provide new httpClient
        {
            provide: AccessManagerClient,
            useFactory: accessManagerClientCreator,
            deps: [HttpHandler]
        },
        DatePipe
    ]
})

export class AppModule {}
