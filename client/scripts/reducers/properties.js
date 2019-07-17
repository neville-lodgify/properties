// import internal dependencies
import { ACTIONS } from '../actions';

////////////////////////////////////////////////////////////////////////////////

const initialState = {
    data: [],
    isLoading: false,
    isErrored: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.PROPERTIES.GET_PROPERTIES_REQUEST:
            return { ...state, isLoading: true, isErrored: false };
        case ACTIONS.PROPERTIES.GET_PROPERTIES_SUCCESS:
            return { ...state, isLoading: false, isErrored: false, data: action.properties };
        case ACTIONS.PROPERTIES.GET_PROPERTIES_FAILURE:
            return { ...state, isLoading: false, isErrored: true };
        default:
            return state;
    }
};
