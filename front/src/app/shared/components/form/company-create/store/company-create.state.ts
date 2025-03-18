import * as fromRoot from 'src/app/core/store';
import { Company } from 'src/app/shared/models';

export const featureName = 'companyCreate';

export interface CompanyCreateState {
    company: Company;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: CompanyCreateState;
}

export const initialState: CompanyCreateState = {
    company: null,
    inProgress: false,
    done: false,
    error: null
};
