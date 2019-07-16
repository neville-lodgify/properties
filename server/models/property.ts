// import external dependencies
import shortid from 'shortid';

// import internal dependencies
import { isObject, isString, isDateString } from '../utils';
import { Contact, isContact } from './contact';
import { Location, isLocation } from './location';

////////////////////////////////////////////////////////////////////////////////

export interface PropertyBase {
    name: string;
    description: string;
    owner: Contact;
    location: Location;
    [x: string]: any;
}

export interface PropertyCreateModel extends PropertyBase {
    image?: string;
}

export interface PropertyUpdateModel extends PropertyBase {
    image: string;
}

export interface Property extends PropertyBase {
    id: string;
    image: string;
    created: string;
    updated: string;
}

const isPropertyBaseObject = (model: any): boolean => {
    return isObject(model)
        && isString(model.name)
        && isString(model.description)
        && isContact(model.owner)
        && isLocation(model.location);
};

export const isPropertyBase = (model: any): model is PropertyBase => {
    return isPropertyBaseObject(model);
};

export const isPropertyCreateModel = (
    model: any
): model is PropertyCreateModel => {
    return isPropertyBaseObject(model);
};

export const isPropertyUpdateModel = (
    model: any
): model is PropertyUpdateModel => {
    return isPropertyBaseObject(model) && isString(model.image);
};

export const isProperty = (model: any): model is Property => {
    return isPropertyBaseObject(model)
        && isString(model.id)
        && isString(model.image)
        && isDateString(model.created)
        && isDateString(model.updated);
};

export const getPropertyFromPropertyCreateModel = (
    model: PropertyCreateModel
): Property => {
    const id = shortid.generate();
    const timestamp = new Date(Date.now()).toISOString();

    return {
        id,
        name: model.name,
        description: model.description,
        owner: model.owner,
        location: model.location,
        image: model.image
            || `https://source.unsplash.com/960x540/?house&sig=${id}`,
        created: timestamp,
        updated: timestamp,
    };
};

export const getPropertyFromPropertyUpdateModel = (
    property: Property,
    model: PropertyUpdateModel
): Property => {
    const timestamp = new Date(Date.now()).toISOString();

    return {
        id: property.id,
        name: model.name,
        description: model.description,
        owner: model.owner,
        location: model.location,
        image: model.image,
        created: property.created,
        updated: timestamp,
    };
};
