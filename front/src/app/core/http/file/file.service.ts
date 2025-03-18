import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { FileManagerClient } from 'src/app/core/clients';
import { Upload } from 'src/app/shared/models';
import { UploadAdapter } from 'src/app/shared/adapters/upload.adapter';

@Injectable({
  providedIn: 'root'
})

export class FileService {
    constructor(
        private httpClient: FileManagerClient,
        private uploadAdapter: UploadAdapter
    ) {}

    uploadAudios({ campaignId, audios }: { campaignId: number, audios: File[] }): Observable<Upload[]> {
        const formData = new FormData();
        audios.forEach(audio => formData.append('audios', audio))        
        return this.httpClient.Post(`audios/${campaignId}`, formData)
            .pipe( map(({ audios }) => {
                return _.map(audios, audio => this.uploadAdapter.adapt(audio))
            }));
    }
}
