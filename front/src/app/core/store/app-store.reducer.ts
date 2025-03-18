import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-store.state';

// reducers
import { reducer as authReducer, featureName as auth } from 'src/app/core/store/auth';
import { reducer as campaignReducer, featureName as campaign } from 'src/app/core/store/campaign';
import { reducer as roleReducer } from 'src/app/core/store/role';
import { reducer as selfReducer } from 'src/app/core/store/self';


export const reducers: ActionReducerMap<AppState> = {
    [auth]: authReducer,
    [campaign]: campaignReducer,
    role: roleReducer,
    self: selfReducer,
};
