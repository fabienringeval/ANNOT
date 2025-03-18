import * as fromRoot from 'src/app/core/store';

export const featureName = 'deleteCompanyButton';

export interface DeleteButtonState {
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: DeleteButtonState;
}

export const initialState: DeleteButtonState = {
    inProgress: false,
    done: false,
    error: null
};
