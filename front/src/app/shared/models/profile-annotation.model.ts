import { Annotation } from './annotation.model';
import { Profile } from './profile.model';
import { ProfileLabel } from './profile-label.model';

export class ProfileAnnotation extends Annotation {
    profile: Profile;
    label: ProfileLabel;
    value: number;
}
