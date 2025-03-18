import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { Company } from 'src/app/shared/models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CompanyAdapter extends Adapter implements AdapterInterface<Company> {
    constructor() {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                name,
                description
            }
        }: {
            id: number,
            attributes: {
                name: string,
                description: string
            }
        }
    ): Company {
        return {
            id,
            name,
            description
        };
    }
}
