import { Action, createReducer, on } from '@ngrx/store';
import * as _ from 'underscore';
import {
    loadingUserList,
    successLoadingUserList,
    errorLoadingUserList,
    addingUsers,
    successAddingUsers,
    errorAddingUsers
} from './user-add.actions';
import { User } from 'src/app/shared/models';
import { UserAddState, initialState } from './user-add.state';

const AddUsersReducer = createReducer(
    initialState,
    on(loadingUserList, (state) => ({
        ...state,
        userList: {
            ...state.userList,
            users: null,
            inProgress: true
        }
    })),
    on(successLoadingUserList, (state, { users }: { users: User[] }) => ({
        ...state,
        userList: {
            ...state.userList,
            users,
            inProgress: false,
            done: true
        }
    })),
    on(errorLoadingUserList, (state, { error }: { error: any }) => ({
        ...state,
        userList: {
            ...state.userList,
            inProgress: false,
            done: false,
            error
        }
    })),
    on(addingUsers, (state) => ({
        ...state,
        timeIntervals: null,
        inProgress: true
    })),
    on(successAddingUsers, (state) => ({
        ...state,
        inProgress: false,
        done: true
    })),
    on(errorAddingUsers, (state, { error }: { error: any }) => ({
        ...state,
        inProgress: false,
        done: false,
        error
    }))
);

export function reducer(state: UserAddState | undefined, action: Action) {
    return AddUsersReducer(state, action);
}
