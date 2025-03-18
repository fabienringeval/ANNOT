import { State as AuthState, featureName as auth } from 'src/app/core/store/auth';
import { State as CampaignState, featureName as campaign } from 'src/app/core/store/campaign';
import { State as RoleState } from 'src/app/core/store/role';
import { State as SelfState } from 'src/app/core/store/self';

export interface AppState {
    [auth]: AuthState;
    [campaign]: CampaignState;
    role: RoleState;
    self: SelfState;
}
