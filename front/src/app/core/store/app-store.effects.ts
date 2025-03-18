import { AuthEffects } from 'src/app/core/store/auth';
import { CampaignEffects } from 'src/app/core/store/campaign';
import { RoleEffects } from 'src/app/core/store/role/role.effects';
import { SelfEffects } from 'src/app/core/store/self/self.effects';

export const effects = [
    AuthEffects,
    CampaignEffects,
    RoleEffects,
    SelfEffects
];
