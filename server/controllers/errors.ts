// import internal dependencies
import { DataError } from '../data';

export enum ResponseError {
    BadRequest,
    ResourceNotFound,
    ServerError,
}

export const getResponseErrorMessage = (error?: ResponseError): string => {
    switch (error) {
        case ResponseError.BadRequest:
            return 'The provided request parameters could not be parsed successfully.';
        case ResponseError.ResourceNotFound:
            return 'The requested resource could not be found.';
        case ResponseError.ServerError:
        default:
            return 'Sorry, an unexpected error occured.';
    }
};

export const getResponseErrorStatus = (error?: ResponseError): number => {
    switch (error) {
        case ResponseError.BadRequest:
            return 400;
        case ResponseError.ResourceNotFound:
            return 404;
        case ResponseError.ServerError:
        default:
            return 500;
    }
};

export const getResponseErrorFromDataError = (error?: DataError): ResponseError => {
    switch (error) {
        case DataError.EntityNotFound:
            return ResponseError.ResourceNotFound;
        case DataError.InvalidEntity:
            return ResponseError.BadRequest
        case DataError.InvalidIdentifier:
            return ResponseError.BadRequest;
        case DataError.UnknownError:
        default:
            return ResponseError.ServerError;
    }
};
