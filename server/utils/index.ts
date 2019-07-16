export const isDefined = (value: any): boolean => {
    return typeof value !== 'undefined';
};

export const isUndefined = (value: any): boolean => {
    return typeof value === 'undefined';
}

export const isString = (value: any, orDefault: boolean = false): boolean => {
    return orDefault
        ? typeof value === 'string'
        : !!value && typeof value === 'string' ;
};

export const isNumber = (value: any): boolean => {
    return !Number.isNaN(Number(value));
};

export const isObject = (value: any): boolean => {
    return value === Object(value);
};

export const isPrimitive = (value: any): boolean => {
    return value !== Object(value);
};

export const isArray = (value: any): boolean => {
    return Array.isArray(value);
};

export const isBoolean = (value: any): boolean => {
    return value === true || value === false;
};

export const isDateString = (value: any): boolean => {
    return isString(value)
        && !Number.isNaN(new Date(value).getTime());
};
