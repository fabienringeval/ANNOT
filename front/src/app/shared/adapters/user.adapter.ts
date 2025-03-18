import { Adapter as AdapterInterface } from '../interfaces/adapter.interface';
import { User } from '../models';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserAdapter extends Adapter implements AdapterInterface<User> {
    constructor() {
        super();
    }

    adapt(
        {
            id,
            attributes: {
                email,
                firstName,
                lastName
            }
        }: {
            id: number,
            attributes: {
                email: string,
                firstName: string,
                lastName: string
            }
        }
    ): User {
        return {
            id,
            email,
            firstName,
            lastName
        };
    }
}
