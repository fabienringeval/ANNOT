import { Injectable } from '@angular/core';
import { BugsnagService } from '../bugsnag/bugsnag.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    constructor(
        private bugsnagService: BugsnagService
    ) { }

    logError(err) {
        if(!environment.production) {
            console.error(err);
        }

        this.bugsnagService.logError(err);
    }
}
