// import external dependencies
import shortid from 'shortid';

// import internal dependencies
import { ServerError } from '../errors';
import { Property } from '../models/property';
import { DataError } from './errors';
import data from './properties-data.json';

////////////////////////////////////////////////////////////////////////////////

export const list = (): Promise<Property[]> => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(data)) {
            reject(DataError.UnknownError);
        } else {
            resolve(data as Property[]);
        }
    });
};

export const single = (id: string): Promise<Property> => {
    return new Promise((resolve, reject) => {
        if (typeof id !== 'string' || !id) {
            reject(DataError.InvalidIdentifier);
        } else {
            const property: Property | undefined = (data as Property[])
                .find((property: Property) => {
                    return property.id === id;
                });

            if (typeof property === 'undefined') {
                reject(DataError.EntityNotFound);
            } else {
                resolve(property);
            }
        }
    });
};

export const create = (model: Property): Promise<Property> => {
    return new Promise((resolve, reject) => {
        reject(ServerError.NotYetImplemented);
    });
};

export const update = (id: string, model: Property): Promise<Property> => {
    return new Promise((resolve, reject) => {
        reject(ServerError.NotYetImplemented);
    });
};

export const remove = (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        reject(ServerError.NotYetImplemented);
    });
};

export const properties = { list, single, create, update, remove };
