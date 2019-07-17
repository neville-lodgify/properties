// import external dependencies
import { connect } from 'react-redux';

// import internal dependencies
import { creators } from '../../creators';
import { Component } from './component';

////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => ({
    properties: state.properties,
});

const mapDispatchToProps = (dispatch) => ({
    getProperties: () => {
        return dispatch(creators.properties.getProperties());
    },
});

export const Container =
    connect(mapStateToProps, mapDispatchToProps)(Component);
