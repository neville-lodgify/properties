// import external dependencies
import { Request, Response } from 'express';

// import internal dependencies
import config from '../config';
import { DataError, properties } from '../data';
import {
    Property,
    isPropertyCreateModel,
    isPropertyUpdateModel,
} from '../models';
import { isString } from '../utils';
import { ResponseError, getResponseErrorFromDataError } from './errors';
import { getSuccessResponse, getErrorResponse } from './response';

////////////////////////////////////////////////////////////////////////////////

const endpoint = `${config.api.url}/properties`;

export const getCollection = (request: Request, response: Response) => {
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

export const getResource = (request: Request, response: Response) => {
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

export const postCollection = (request: Request, response: Response) => {
    if (isPropertyCreateModel(request.body.property)) {
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
        const payload = getErrorResponse(endpoint, ResponseError.BadRequest);
        response
            .status(payload.error.status)
            .json(payload);
    }
};

export const putResource = (request: Request, response: Response) => {
    if (isString(request.params.id)
        && isPropertyUpdateModel(request.body.property)
    ) {
        properties
            .update(request.params.id, request.body.property)
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

export const deleteResource = (request: Request, response: Response) => {
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

export default {
    getCollection,
    getResource,
    postCollection,
    putResource,
    deleteResource,
};
