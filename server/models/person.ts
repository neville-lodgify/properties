// import internal dependencies
import { Location } from './location';

////////////////////////////////////////////////////////////////////////////////

export interface Contact {
    name: string;
    phone: string;
    email: string;
    location: Location;
}

export default Contact;
