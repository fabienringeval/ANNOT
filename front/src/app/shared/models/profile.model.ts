import { User } from './user.model';
import { ProfileLabel } from './profile-label.model';

export class Profile {
    id: number;
    name: string;
    labels: ProfileLabel[];
    description: string;
    value: number;
    createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}
