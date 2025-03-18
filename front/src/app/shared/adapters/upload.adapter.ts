import { Upload } from 'src/app/shared/models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UploadAdapter {
    adapt(
        {
            size,
            name,
            type,
            link
        }: {
            size: number,
            name: string,
            type: string,
            link: string
        },
        included?
    ): Upload {
        return {
            size,
            name,
            type,
            link
        };
    }
}
