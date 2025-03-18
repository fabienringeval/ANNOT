import { User } from './user.model';
import { Audio } from './audio.model';

export class Annotation {
    id: number;
    user?: User;
    audio?: Audio;
}
