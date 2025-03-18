import { Role } from 'src/app/shared/models';
import { Module } from 'src/app/shared/models';

export interface State {
    roles: Role[],
    modules: Module[],
    inProgress: boolean;
    granted: boolean;
    done: boolean;
    error: any;
}

export const initialState: State = {
    roles: null,
    modules: null,
    inProgress: false,
    granted: null,
    done: false,
    error: null
};
