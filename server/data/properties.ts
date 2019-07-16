// import internal dependencies
import {
    Property,
    PropertyCreateModel,
    PropertyUpdateModel,
    isProperty,
    isPropertyCreateModel,
    isPropertyUpdateModel,
    getPropertyFromPropertyCreateModel,
    getPropertyFromPropertyUpdateModel,
} from '../models/property';
import { isUndefined, isString } from '../utils';
import { DataError } from './errors';

// import static data
import data from './properties-data.json';

////////////////////////////////////////////////////////////////////////////////

const properties: Property[] = data as Property[];

export const list = (): Promise<Property[]> => {
    return new Promise((resolve) => { resolve(properties); });
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

export const create = (model: PropertyCreateModel): Promise<Property> => {
    return new Promise((resolve, reject) => {
        if (isPropertyCreateModel(model)) {
            const property: Property =
                getPropertyFromPropertyCreateModel(model);

            properties.push(property);
            resolve(property);
        } else {
            reject(DataError.InvalidEntity);
        }
    });
};

export const update = (
    id: string,
    model: PropertyUpdateModel
): Promise<Property> => {
    return new Promise((resolve, reject) => {
        if (isString(id)) {
            if (isPropertyUpdateModel(model)) {
                const index = properties.findIndex((property: Property) => {
                    return property.id === id;
                });

                if (index > -1) {
                    const property = getPropertyFromPropertyUpdateModel(
                        properties[index],
                        model
                    );

                    properties.splice(index, 1, property);
                    resolve(property);
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

export default {
    list,
    single,
    create,
    update,
    remove,
};
