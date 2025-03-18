import * as fromRoot from 'src/app/core/store';
import { Company } from 'src/app/shared/models';

export const featureName = 'loadCompanyList';

export interface LoadCompanyListState {
    companies: Company[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadCompanyListState;
}

export const initialState: LoadCompanyListState = {
    companies: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
