// import internal dependencies
import { isObject, isString, isDateString } from '../utils';
import { Contact, isContact } from './contact';
import { Location, isLocation } from './location';

////////////////////////////////////////////////////////////////////////////////

export interface PropertyModel {
    name: string;
    description: string;
    owner: Contact;
    location: Location;
    created?: string;
    updated?: string;
    image?: string;
}

export interface Property extends PropertyModel {
    id: string;
    created: string;
    updated: string;
    image: string;
}

const isModel = (model: any): boolean => {
    return isObject(model)
        && isString(model.name)
        && isString(model.description)
        && isContact(model.owner)
        && isLocation(model.location);
};

export const isPropertyModel = (model: any): model is PropertyModel => {
    return isModel(model);
};

export const isProperty = (property: any): property is Property => {
    return isModel(property)
        && isString(property.id)
        && isDateString(property.created)
        && isDateString(property.updated)
        && isString(property.image, true);
};
