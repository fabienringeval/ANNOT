import * as fromRoot from 'src/app/core/store';
import { User } from 'src/app/shared/models';

export const featureName = 'loadUserList';

export interface LoadUserListState {
    users: User[];
    total: number;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: LoadUserListState;
}

export const initialState: LoadUserListState = {
    users: null,
    total: null,
    inProgress: false,
    done: false,
    error: null
};
