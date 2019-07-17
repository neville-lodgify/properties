// import internal dependencies
import { ACTIONS } from '../actions';

////////////////////////////////////////////////////////////////////////////////

const endpoint = '/api/v1/properties';

export const getProperties = () => async dispatch => {
    dispatch({ type: ACTIONS.PROPERTIES.GET_PROPERTIES_REQUEST });

    fetch(endpoint)
        .then((response) => {
            return response.json();
        })
        .then((properties) => {
            dispatch({ type: ACTIONS.PROPERTIES.GET_PROPERTIES_SUCCESS, properties: properties.data });
        })
        .catch((error) => {
            dispatch({ type: ACTIONS.PROPERTIES.GET_PROPERTIES_FAILURE, error });
        });
};

export const properties = { getProperties };
