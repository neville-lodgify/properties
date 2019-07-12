// import internal dependencies
import { Contact } from './person';
import { Location } from './location';

////////////////////////////////////////////////////////////////////////////////

export interface Property {
    id: string;
    name: string;
    description: string;
    owner: Contact;
    location: Location;
    created: string;
    updated: string;
    image?: string;
}

////////////////////////////////////////////////////////////////////////////////

export default Property;
