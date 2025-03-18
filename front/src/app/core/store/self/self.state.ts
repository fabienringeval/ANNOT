import { User } from 'src/app/shared/models';

export const featureName = 'self';

export interface State {
    user: User;
    inProgress: boolean;
    done: boolean;
    error: any;
}

export const initialState: State = {
    user: null,
    inProgress: false,
    done: false,
    error: null
};
