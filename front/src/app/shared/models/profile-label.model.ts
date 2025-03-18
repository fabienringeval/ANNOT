import { User } from './user.model';
import { Profile } from './profile.model';

export class ProfileLabel {
    id: number;
    label: string;
    Profile?: Profile;
    createdAt?: Date;
    updatedAt?: Date;
}
