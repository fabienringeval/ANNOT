export const featureName = 'auth';

export interface State {
    accessToken: string;
    refreshToken: string;
    inProgress: boolean;
    logged: boolean;
    error: any;
}

export const initialState: State = {
    accessToken: null,
    refreshToken: null,
    inProgress: false,
    logged: false,
    error: null
};
