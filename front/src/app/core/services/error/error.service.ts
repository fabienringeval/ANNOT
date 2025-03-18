import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class ErrorService {
    message = `Une erreur s'est produite sur la solution. Merci de contacter l'assistance viadialog`;

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }

        if(environment.production) {
            return this.message;
        }

        return error.message ? this.message + '\n' + error.message : this.message + '\n' + error.toString();
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return this.message + '/n' + error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}
