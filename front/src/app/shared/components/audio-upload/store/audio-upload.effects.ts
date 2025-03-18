import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    addingAudios,
    successAddingAudios,
    errorAddingAudios,
    uploadingAudios,
    successUploadingAudios,
    errorUploadingAudios
} from './audio-upload.actions';
import { Upload } from 'src/app/shared/models';
import { FileService, CampaignService } from 'src/app/core/http';


@Injectable()
export class AudioUploadEffects {
    uploadingAudios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadingAudios),
            exhaustMap(({ campaignId, audios }: { campaignId: number, audios: File[] }) =>
                this.fileService.uploadAudios({ campaignId, audios })
                .pipe(
                    mergeMap((uploads: Upload[]) => [
                        successUploadingAudios({ uploads }), 
                        addingAudios({ campaignId, uploads })
                    ]),
                    catchError(error => of(errorUploadingAudios({ error })))
                )
            )
        )
    );

    addingAudios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addingAudios),
            exhaustMap(({ campaignId, uploads }: { campaignId: number, uploads: Upload[] }) =>
                this.campaignService.addAudios({ campaignId, uploads })
                .pipe(
                    map(() => successAddingAudios()),
                    catchError(error => of(errorAddingAudios({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService,
        private fileService: FileService
    ) {}
}
