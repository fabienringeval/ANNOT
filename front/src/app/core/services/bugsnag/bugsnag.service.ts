import { Injectable } from '@angular/core';
import Bugsnag from '@bugsnag/js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BugsnagService {

    constructor() { Bugsnag.start(environment.bugsnag.apiKey); }

    logError(err) {
        Bugsnag.notify(err);
    }
}
