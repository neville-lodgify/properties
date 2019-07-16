// import internal dependencies
import { isObject, isString } from '../utils';
import { Location, isLocation } from './location';

////////////////////////////////////////////////////////////////////////////////

export interface Contact {
    name: string;
    phone: string;
    email: string;
    location: Location;
}

export const isContact = (contact: any): contact is Contact => {
    return isObject(contact)
        && isString(contact.name)
        && isString(contact.phone)
        && isString(contact.email)
        && isLocation(contact.location);
};
