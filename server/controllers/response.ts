// import internal dependencies
import {
    isDefined,
    isUndefined,
    isObject,
    isBoolean,
    isString,
} from "../utils";
import {
    ResponseError,
    getResponseErrorMessage,
    getResponseErrorStatus,
} from './errors';

////////////////////////////////////////////////////////////////////////////////

export interface Response {
    success: boolean;
    meta: {
        timestamp: string;
        url: string;
    };
}

export interface SuccessResponse extends Response {
    success: true;
    data: any;
}

export interface ErrorResponse extends Response {
    success: false;
    error: {
        message: string;
        status: number;
    };
}

export const isResponseObject = (response: any): boolean => {
    return isObject(response)
        && isBoolean(response.success)
        && isObject(response.meta)
        && isString(response.meta.timestamp)
        && isString(response.meta.url);
};

export const isResponse = (response: any): response is Response => {
    return isResponseObject(response);
}

export const isSuccessReponse = (response: any): response is SuccessResponse => {
    return isResponseObject(response)
        && response.success === true
        && isDefined(response.data)
        && isUndefined(response.error);
};

export const isErrorReponse = (response: any): response is ErrorResponse => {
    return isResponseObject(response)
        && response.success === false
        && isUndefined(response.data)
        && isDefined(response.error);
};

const getMetaObject = (url: string) => {
    return { timestamp: new Date(Date.now()).toISOString(), url };
};

export const getSuccessResponse = (url: string, data: any): SuccessResponse => {
    return {
        success: true,
        data,
        meta: getMetaObject(url),
    };
};

export const getErrorResponse = (url: string, error?: ResponseError): ErrorResponse => {
    return {
        success: false,
        error: {
            message: getResponseErrorMessage(error),
            status: getResponseErrorStatus(error),
        },
        meta: getMetaObject(url),
    };
};
