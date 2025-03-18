import * as fromRoot from 'src/app/core/store';
import { User } from 'src/app/shared/models';

export const featureName = 'userAdd';

export interface UserAddState {
    userList: {
        users: User[];
        inProgress: boolean;
        done: boolean;
        error: any;
    }
    inProgress: boolean;
    done: boolean;
    error: any;
}

export interface State extends fromRoot.State {
    [featureName]: UserAddState;
}

export const initialState: UserAddState = {
    userList: {
        users: null,
        inProgress: false,
        done: false,
        error: null
    },
    inProgress: false,
    done: false,
    error: null
};
