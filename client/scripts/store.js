// import external dependencies
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

// import internal dependencies
import { reducer } from "./reducers";

////////////////////////////////////////////////////////////////////////////////

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const create = () => {
    return createStore(reducer, enhancers(
        applyMiddleware(thunk)
    ));
};

export const factory = { create };

