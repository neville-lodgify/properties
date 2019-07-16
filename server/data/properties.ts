// import external dependencies
import shortid from 'shortid';

// import internal dependencies
import {
    Property,
    PropertyModel,
    isProperty,
    isPropertyModel,
} from '../models/property';
import { DataError } from './errors';
import { isUndefined, isString } from '../utils';

// import data
import data from './properties-data.json';

////////////////////////////////////////////////////////////////////////////////

const properties: Property[] = data as Property[];

export const list = (): Promise<Property[]> => {
    return new Promise((resolve) => {
        resolve(properties);
    });
};

export const single = (id: string): Promise<Property> => {
    return new Promise((resolve, reject) => {
        if (isString(id)) {
            const property: Property | undefined = properties
                .find((property: Property) => {
                    return property.id === id;
                });

            if (isProperty(property)) {
                resolve(property);
            } else if (isUndefined(property)) {
                reject(DataError.EntityNotFound);
            } else {
                reject(DataError.UnknownError);
            }
        } else {
            reject(DataError.InvalidIdentifier);
        }
    });
};

export const create = (model: PropertyModel): Promise<Property> => {
    return new Promise((resolve, reject) => {
        if (isPropertyModel(model)) {
            const id = shortid.generate();
            const date = new Date(Date.now()).toISOString();
            const property: Property = {
                ...model,
                id,
                image: `https://source.unsplash.com/960x540/?house&sig=${id}`,
                created: date,
                updated: date,
            };
            data.push(property);
            resolve(property);
        } else {
            reject(DataError.InvalidEntity);
        }
    });
};

export const update = (id: string, property: Property): Promise<Property> => {
    return new Promise((resolve, reject) => {
        if (isString(id)) {
            if (isProperty(property)) {
                const index = properties.findIndex((property: Property) => {
                    return property.id === id;
                });

                if (index > -1) {
                    const date = new Date(Date.now()).toISOString();
                    const updated = {
                        ...property,
                        id,
                        updated: date,
                    };
                    properties.splice(index, 1, updated);
                    resolve(properties[index]);
                } else {
                    reject(DataError.EntityNotFound);
                }
            } else {
                reject(DataError.InvalidEntity);
            }
        } else {
            reject(DataError.InvalidIdentifier);
        }
    });
};

export const remove = (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (isString(id)) {
            const index = properties.findIndex((property: Property) => {
                return property.id === id;
            });

            if (index > -1) {
                const removed = properties.splice(index, 1);

                if (removed.length) {
                    resolve(true);
                } else {
                    reject(DataError.UnknownError);
                }
            } else {
                reject(DataError.EntityNotFound);
            }
        } else {
            reject(DataError.InvalidIdentifier);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////

export default { list, single, create, update, remove };
