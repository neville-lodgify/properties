// import external dependencies
import { Request, Response } from 'express';

// import internal dependencies
import { DataError, properties } from '../data';
import { Property, isPropertyModel, isProperty } from '../models';
import config from '../config';
import { isString } from '../utils';
import { ResponseError, getResponseErrorFromDataError } from './errors';
import { getSuccessResponse, getErrorResponse } from './response';

////////////////////////////////////////////////////////////////////////////////

const endpoint = `${config.api.url}/properties`;

export const list = (request: Request, response: Response) => {
    properties
        .list()
        .then((properties: Property[]) => {
            const payload = getSuccessResponse(endpoint, properties);
            response
                .status(200)
                .json(payload);
        })
        .catch((error: DataError) => {
            const payload = getErrorResponse(
                endpoint,
                getResponseErrorFromDataError(error)
            );
            response
                .status(payload.error.status)
                .json(payload);
        });
};

export const single = (request: Request, response: Response) => {
    if (isString(request.params.id)) {
        properties
            .single(request.params.id)
            .then((property: Property) => {
                const payload = getSuccessResponse(
                    `${endpoint}/${request.params.id}`,
                    property
                );
                response
                    .status(200)
                    .json(payload);
            })
            .catch((error: DataError) => {
                const payload = getErrorResponse(
                    `${endpoint}/${request.params.id}`,
                    getResponseErrorFromDataError(error)
                );
                response
                    .status(payload.error.status)
                    .json(payload);
            });

    } else {
        const payload = getErrorResponse(endpoint, ResponseError.BadRequest);
        response
            .status(payload.error.status)
            .json(payload);
    }
};

export const create = (request: Request, response: Response) => {
    if (isPropertyModel(request.body.property)) {
        properties
            .create(request.body.property)
            .then((property: Property) => {
                const payload = getSuccessResponse(
                    `${endpoint}/${property.id}`,
                    property
                );
                response
                    .status(201)
                    .json(payload);
            })
            .catch((error: DataError) => {
                const payload = getErrorResponse(
                    endpoint,
                    getResponseErrorFromDataError(error)
                );
                response
                    .status(payload.error.status)
                    .json(payload);
            });
    } else {
        console.log('[DEBUG] Controller > Create > Model validation failed', request.body); // DEBUG
        const payload = getErrorResponse(endpoint, ResponseError.BadRequest);
        response
            .status(payload.error.status)
            .json(payload);
    }
};

export const update = (request: Request, response: Response) => {
    if (isString(request.params.id) && isProperty(request.params.property)) {
        properties
            .update(request.params.id, request.params.property)
            .then((property: Property) => {
                const payload = getSuccessResponse(
                    `${endpoint}/${property.id}`,
                    property
                );
                response
                    .status(200)
                    .json(payload);
            })
            .catch((error: DataError) => {
                const payload = getErrorResponse(
                    endpoint,
                    getResponseErrorFromDataError(error)
                );
                response
                    .status(payload.error.status)
                    .json(payload);
            });
    } else {
        const payload = getErrorResponse(endpoint, ResponseError.BadRequest);
        response
            .status(payload.error.status)
            .json(payload);
    }
};

export const remove = (request: Request, response: Response) => {
    if (isString(request.params.id)) {
        properties
            .remove(request.params.id)
            .then((success) => {
                const payload = getSuccessResponse(endpoint, success);
                response.status(200).json(payload);
            })
            .catch((error: DataError) => {
                const payload = getErrorResponse(
                    endpoint,
                    getResponseErrorFromDataError(error)
                );
                response
                    .status(payload.error.status)
                    .json(payload);
            });
    } else {
        const payload = getErrorResponse(endpoint, ResponseError.BadRequest);
        response
            .status(payload.error.status)
            .json(payload);
    }
};

////////////////////////////////////////////////////////////////////////////////

export default { list, single, create, update, remove };
