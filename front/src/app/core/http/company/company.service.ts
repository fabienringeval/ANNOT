import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient } from 'src/app/core/clients';
import { Company } from 'src/app/shared/models';
import { CompanyAdapter } from 'src/app/shared/adapters'
import { Pagination } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
    constructor(
        private httpClient: VianoteApiClient,
        private companyAdapter: CompanyAdapter
    ) {}

    loadCompany({ companyId }: { companyId: number }): Observable<Company> {
        return this.httpClient.Get(`v1/companies/${companyId}`).pipe( map(({ data }) =>  this.companyAdapter.adapt(data)));
    }

    deleteCompany({ companyId }: { companyId: number }): Observable<void> {
        return this.httpClient.Delete(`v1/companies/${companyId}`);
    }

    loadCompanyList({ pagination: { page = 1, paginate } }: { pagination?: Pagination } = { pagination: { page: 1, paginate: 'all' } }): Observable<{ companies: Company[], total: number}> {
        return this.httpClient.Get(`v1/companies?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...companies], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  companies: _.map(companies, data => this.companyAdapter.adapt(data)),
                  total
              })
            )
        );
    }
    
    createCompany({ 
        name,
        description = ''
    }: { 
        name: string,
        description: string
    }): Observable<Company> {
        let params = { name, description }
        
        return this.httpClient.Post('v1/companies', params).pipe( map(({ data }) =>  this.companyAdapter.adapt(data)));
    }
}
