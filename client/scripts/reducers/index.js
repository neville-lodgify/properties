// import external dependencies
import { combineReducers } from 'redux';


// import internal dependencies
import { reducer as properties } from './properties';

////////////////////////////////////////////////////////////////////////////////

export const reducer = combineReducers({ properties });
